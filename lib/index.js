const fs = require('fs')
const archiver = require('archiver')
const path = require('path')
const cliProgress = require('cli-progress')
const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
/**
 * @typedef {Object} Option
 * @property {Object} archive
 * @property {Object} tencent
 */
module.exports = async function (opt) {
  const cwdPath = process.cwd()
  const archive = archiver('zip', {
    zlib: {
      level: 9
    }
  })
  const output = fs.createWriteStream(path.resolve(cwdPath, 'node_modules.zip'))

  output.on('close', function () {
    console.log(archive.pointer() + ' total bytes')
    console.log('archiver has been finalized and the output file descriptor has closed.')
  })

  output.on('end', function () {
    console.log('Data has been drained')
  })
  output.on('finish', () => {
    // bar.stop()
    console.log('has zipped!')
  })
  archive.on('warning', function (err) {
    if (err.code === 'ENOENT') {
      // log warning
    } else {
      // throw error
      throw err
    }
  })

  archive.on('error', function (err) {
    throw err
  })
  // archive.on('progress', ({
  //   entries,
  //   fs
  // }) => {
  //   console.log(entries, fs)
  // })

  archive.pipe(output)

  archive.directory('node_modules', false)
  await archive.finalize()
}
