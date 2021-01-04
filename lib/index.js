const fs = require('fs')
const archiver = require('archiver')
const path = require('path')
const cliProgress = require('cli-progress')

const {
  directorySize,
  bytesToSize
} = require('./util.js')
/**
 * @typedef {Object} Option
 * @property {Object} archive
 * @property {Object} tencent
 */
module.exports = async function (opt) {
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
  const cwdPath = process.cwd()
  const archive = archiver('zip', {
    zlib: {
      level: 9
    }
  })
  const totalSize = await directorySize('node_modules')
  const output = fs.createWriteStream(path.resolve(cwdPath, 'node_modules.zip'))

  output.on('close', () => {
    const archiveSize = archive.pointer()
    console.log('Archiver wrote %s bytes', bytesToSize(archiveSize))
    console.log('Compression ratio: %d:1', Math.round(totalSize / archiveSize))
    console.log('Space savings: %d %', (1 - (archiveSize / totalSize)) * 100)
  })

  archive.on('error', (err) => {
    throw err
  })
  archive.on('progress', ({
    entries,
    fs
  }) => {
    const percent = 100 - ((totalSize - fs.processedBytes) / totalSize) * 100
    bar.update(parseFloat(percent.toFixed(2)))
  })
  archive.on('finish', () => {
    bar.stop()
  })

  bar.start(100, 0)
  archive.pipe(output)
  archive.directory('node_modules', false)
  await archive.finalize()
}
