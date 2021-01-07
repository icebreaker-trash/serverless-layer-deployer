const compress = require('./compress')
const tencent = require('./providers/tencent')
const path = require('path')

/**
 * @typedef {Object} CompressOption
 * @property {String} dirpath
 * @property {String} destpath
 *
 *
 * @param {CompressOption} compressOpt
 */
async function deployLayer (compressOpt, cosOpt, ymlObj) {
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
    path: layerPath
  } = await compress(dirpath, destpath)
  const fileName = path.basename(layerPath)
  await tencent.deployByCos({
    Bucket,
    FilePath: layerPath,
    Key: fileName,
    Region,
    SecretId,
    SecretKey
  }, ymlObj)
}

module.exports = {
  deployLayer,
  compress,
  tencent
}
