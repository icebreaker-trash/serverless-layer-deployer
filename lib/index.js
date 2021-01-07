const compress = require('./compress')
const tencent = require('./providers/tencent')
const path = require('path')

/**
 * @typedef {Object} CompressOption
 * @property {String} dirpath
 * @property {String} destpath
 *
 * @typedef {Object} InputsOption
 * @property {String} name
 * @property {String} region
 *
 * @typedef {Object} YmlOption
 * @property {String} name
 * @property {InputsOption} inputs

 *
 * @param {CompressOption} compressOpt
 * @param {YmlOption} ymlOpt
 */
async function deployLayer (ymlOpt, compressOpt, cosOpt) {
  const cwdPath = process.cwd()
  const {
    dirpath,
    destpath
  } = Object.assign({
    dirpath: path.resolve(cwdPath, 'node_modules'),
    destpath: path.resolve(cwdPath, '.serverless/layer/node_modules.zip')
  }, compressOpt)
  const {
    Bucket,
    Region,
    SecretId,
    SecretKey
  } = Object.assign({}, {
    Bucket: process.env.TENCENT_COS_LAYER_BUCKET,
    Region: process.env.TENCENT_COS_LAYER_REGION,
    SecretId: process.env.TENCENT_SECRET_ID,
    SecretKey: process.env.TENCENT_SECRET_KEY
  }, cosOpt)

  const {
    path: layerPath,
    filename: layerFilename
  } = await compress(dirpath, destpath)
  return await tencent.deployByCos({
    Bucket,
    FilePath: layerPath,
    Key: layerFilename,
    Region,
    SecretId,
    SecretKey
  }, ymlOpt)
}

module.exports = {
  deployLayer,
  compress,
  tencent
}
