const fs = require('fs')
const archiver = require('archiver')
const path = require('path')
const cliProgress = require('cli-progress')

const { directorySize, bytesToSize } = require('./util.js')

/**
 * @typedef {Object} Option
 * @property {Object} archive
 * @property {Object} tencent
 */
module.exports = async function (dirpath, opt) {
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic)
  const cwdPath = process.cwd()
  const archive = archiver('zip', {
    zlib: {
      level: 9
    }
  })
  const totalSize = await directorySize(dirpath)
  console.log('totalSize:', bytesToSize(totalSize))
  const zipPath = path.resolve(cwdPath, 'node_modules.zip')
  const output = fs.createWriteStream(zipPath)
  const wsPromise = new Promise((resolve, reject) => {
    output.on('close', () => {
      const archiveSize = archive.pointer()
      console.log('Archiver wrote %s bytes', bytesToSize(archiveSize))
      console.log(
        'Compression ratio: %d:1',
        Math.round(totalSize / archiveSize)
      )
      console.log('Space savings: %d %', (1 - archiveSize / totalSize) * 100)
      resolve(archiveSize)
    })
  })

  archive.on('error', (err) => {
    throw err
  })
  archive.on('progress', ({ fs }) => {
    const percent = 100 - ((totalSize - fs.processedBytes) / totalSize) * 100
    bar.update(parseFloat(percent.toFixed(2)))
  })
  archive.on('finish', () => {
    bar.stop()
  })

  bar.start(100, 0)
  archive.pipe(output)
  archive.directory(dirpath, false)
  archive.finalize()
  const size = await wsPromise
  const result = {
    path: zipPath,
    size
  }
  return result
}
