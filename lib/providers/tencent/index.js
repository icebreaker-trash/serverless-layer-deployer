const upload = require('./upload')
const getLayerTemplete = require('./templete/generate.js')
const { yaml } = require('serverless-config-generator')
const fsp = require('fs').promises
const merge = require('lodash.merge')
const { ServerlessSDK, utils: tencentUtils } = require('@serverless/platform-client-china')
const { v4: uuidv4 } = require('uuid')
const { version } = require('../../../package.json')

const loadInstanceCredentials = () => {
  // Load env vars TODO
  const envVars = {}

  // Known Provider Environment Variables and their SDK configuration properties
  const providers = {}

  // Tencent
  providers.tencent = {}
  providers.tencent.TENCENT_APP_ID = 'AppId'
  providers.tencent.TENCENT_SECRET_ID = 'SecretId'
  providers.tencent.TENCENT_SECRET_KEY = 'SecretKey'
  providers.tencent.TENCENT_TOKEN = 'Token'

  const credentials = {}

  for (const [providerName, provider] of Object.entries(providers)) {
    const providerEnvVars = provider
    for (const [envVarName, envVarValue] of Object.entries(providerEnvVars)) {
      if (!credentials[providerName]) {
        credentials[providerName] = {}
      }
      // Proper environment variables override what's in the .env file
      if (process.env[envVarName] != null) {
        credentials[providerName][envVarValue] = process.env[envVarName]
      } else if (envVars[envVarName] != null) {
        credentials[providerName][envVarValue] = envVars[envVarName]
      }
      continue
    }
  }

  return credentials
}

/**
 * @typedef {Object} CosOption
 * @property {String} SecretId
 * @property {String} SecretKey
 * @property {String} Bucket
 * @property {String} Region
 * @property {String} Key
 * @property {String} FilePath
 * @param {CosOption} cosOpt
 */
async function deployByCos (cosOpt, yml) {
  const { Key, Bucket } = await upload(cosOpt) //  { Key: 'node_modules.zip', Bucket: 'sls-layer-ap-shanghai-code-1257725330' } // await upload(cosOpt)
  console.log(`Success upload! [Key]:${Key} [Bucket]:${Bucket}`)
  await fsp.writeFile('.serverless/layer/upload.tmp.json', JSON.stringify({
    Key,
    Bucket
  }))
  const targetYml = merge(
    {},
    {
      inputs: {
        src: {
          bucket: Bucket,
          object: Key
        }
      }
    },
    yml
  )

  return await serverlessDeploy(await generateYml(targetYml))
}

async function generateYml (source) {
  const instanceYaml = getLayerTemplete(source)
  const yml = yaml.dump(instanceYaml)
  await fsp.writeFile('.serverless/layer/serverless.yml', yml)
  return instanceYaml
}

async function serverlessDeploy (instanceYaml) {
  process.chdir('./.serverless/layer')
  const options = {}
  const orgUid = await tencentUtils.getOrgId()
  instanceYaml.org = orgUid

  const sdk = new ServerlessSDK({
    accessKey: tencentUtils.buildTempAccessKeyForTencent({
      SecretId: process.env.TENCENT_SECRET_ID,
      SecretKey: process.env.TENCENT_SECRET_KEY,
      Token: process.env.TENCENT_TOKEN
    }),
    context: {
      orgUid,
      orgName: instanceYaml.org,
      traceId: uuidv4()
    },
    agent: `ServerlessLayerDeployer_${version}`
  })
  if (!instanceYaml.app) {
    instanceYaml.app = instanceYaml.name
  }
  const instanceCredentials = await loadInstanceCredentials(instanceYaml.stage)
  console.log('Deploying ...')
  const instance = await sdk.deploy(instanceYaml, instanceCredentials, options)
  console.log(`Deploy Layer Success!
  [Layer Name]:${instance.outputs.name}
  [Layer Region]:${instance.outputs.region}
  [Layer Version]:${instance.outputs.version}
  `)
  return instance
}

module.exports = {
  getLayerTemplete,
  generateYml,
  upload,
  deployByCos,
  serverlessDeploy
}
