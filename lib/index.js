const compress = require('./compress')
const tencent = require('./providers/tencent')
const VERSION = require('../package.json').version

const {
  overrideLayerVersion,
  checkIsServerlessInstalledGlobally,
  getDefaultCompressOption,
  getDefaultCosOption
} = require('./util')
/**
 * @description https://github.com/serverless-components/tencent-layer/blob/master/docs/configure.md
 * @typedef {Object} CompressInnerOption
 * @property {String|Boolean} innerPath
 * @typedef {Object} CompressOption
 * @property {String} dirpath
 * @property {String} destpath
 * @property {CompressInnerOption} option
 *
 *
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
 *
 */
async function deployTencentLayer (ymlOpt, compressOpt, cosOpt) {
  const hasInstalledServerless = await checkIsServerlessInstalledGlobally()
  if (!hasInstalledServerless) {
    throw new Error('you should install serverless globally')
  }
  const { dirpath, destpath, option } = Object.assign(
    getDefaultCompressOption(),
    compressOpt
  )
  const { Bucket, Region, SecretId, SecretKey } = Object.assign(
    {},
    getDefaultCosOption(),
    cosOpt
  )

  const { path: layerPath, filename: layerFilename } = await compress(
    dirpath,
    destpath,
    option
  )
  return await tencent.deployByCos(
    {
      Bucket,
      FilePath: layerPath,
      Key: layerFilename,
      Region,
      SecretId,
      SecretKey
    },
    ymlOpt
  )
}

module.exports = {
  deployTencentLayer,
  compress,
  overrideLayerVersion,
  checkIsServerlessInstalledGlobally,
  tencent,
  VERSION
}
