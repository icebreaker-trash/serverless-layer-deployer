const upload = require('./upload')
const getLayerTemplete = require('./templete/generate.js')
const {
  yaml
} = require('serverless-config-generator')
const fsp = require('fs').promises
const execa = require('execa')
const merge = require('lodash.merge')

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
  const {
    Key,
    Bucket
  } = await upload(cosOpt)
  const targetYml = merge({}, {
    inputs: {
      src: {
        bucket: Bucket,
        object: Key
      }
    }
  }, yml)
  await generateYml(targetYml)
  return await serverlessDeploy()
}

async function generateYml (source) {
  const yml = yaml.dump(
    getLayerTemplete(source)
  )
  return await fsp.writeFile('.serverless/layer/serverless.yml', yml)
}

async function serverlessDeploy () {
  process.chdir('./.serverless/layer')
  const {
    stdout
  } = await execa('serverless', ['deploy'])
  console.log(stdout)
  return stdout
}
module.exports = {
  getLayerTemplete,
  generateYml,
  upload,
  deployByCos,
  serverlessDeploy

}
