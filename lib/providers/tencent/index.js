const upload = require('./upload')
const getLayerTemplete = require('./templete/generate.js')
const {
  yaml
} = require('serverless-config-generator')
const fsp = require('fs').promises
const execa = require('execa')

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
async function deployByCos (cosOpt) {
  const {
    Key,
    Bucket
  } = await upload(cosOpt)
  await generateYml({
    inputs: {
      src: {
        bucket: Bucket,
        object: Key
      }
    }
  })
  return await serverlessDeploy()
}

async function generateYml (cfg) {
  const yml = yaml.dump(
    getLayerTemplete(cfg)
  )
  return await fsp.writeFile('.serverless/layer/serverless.yml', yml)
}

async function serverlessDeploy () {
  const {
    stdout
  } = await execa('serverless', ['deploy'])
  return stdout
}
module.exports = {
  getLayerTemplete,
  generateYml,
  upload,
  deployByCos,
  serverlessDeploy

}
