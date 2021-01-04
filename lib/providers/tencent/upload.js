const COS = require('cos-nodejs-sdk-v5')
const cliProgress = require('cli-progress')
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
module.exports = async function (cosOpt) {
  const { SecretId, SecretKey, Bucket, Region, Key, FilePath } = cosOpt

  const cos = new COS({
    SecretId,
    SecretKey
  })
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
  bar.start(100, 0)
  function upload () {
    return new Promise((resolve, reject) => {
      cos.sliceUploadFile(
        {
          Bucket,
          Region,
          Key,
          FilePath,
          onProgress (progressData) {
            bar.update(progressData.percent * 100)
          }
        },
        (err, data) => {
          err ? reject(err) : resolve(data)
        }
      )
    })
  }
  /**
   * @typedef {Object} FileInfo
   * @property {Number} statusCode
   * @property {Object} headers
   * @property {String} Location
   * @property {String} Bucket
   * @property {String} Key
   * @property {String} ETag
   * @property {String} VersionId
   * @type {FileInfo}  data
   */
  try {
    const data = await upload()
    // https://cloud.tencent.com/document/product/436/36119#.E5.88.86.E5.9D.97.E4.B8.8A.E4.BC.A0.E5.AF.B9.E8.B1.A1
    return data
  } finally {
    bar.stop()
  }
}
