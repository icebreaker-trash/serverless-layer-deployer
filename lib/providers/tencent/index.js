const upload = require('./upload')
const getLayerTemplete = require('./templete/generate.js')
const { yaml } = require('serverless-config-generator')
const fsp = require('fs').promises
const execa = require('execa')
const merge = require('lodash.merge')
const stripAnsi = require('strip-ansi')
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
  const { Key, Bucket } = await upload(cosOpt)
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
  await generateYml(targetYml)
  return await serverlessDeploy()
}

async function generateYml (source) {
  const yml = yaml.dump(getLayerTemplete(source))
  return await fsp.writeFile('.serverless/layer/serverless.yml', yml)
}

function getDeployResponse (stdout) {
  const strippedStr = stripAnsi(stdout)
  const psign = 'aNA\n'
  const qsign = 'Full details'
  const p = strippedStr.lastIndexOf(psign)
  const q = strippedStr.lastIndexOf(qsign)
  const target = strippedStr.substring(p + psign.length, q)
  return yaml.load(target)
}

async function serverlessDeploy () {
  process.chdir('./.serverless/layer')
  const p = execa('serverless', ['deploy'])
  p.stdout.pipe(process.stdout)
  const { stdout } = await p
  return getDeployResponse(stdout)
}

module.exports = {
  getLayerTemplete,
  generateYml,
  upload,
  deployByCos,
  serverlessDeploy
}
