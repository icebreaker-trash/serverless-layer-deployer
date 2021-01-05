const compress = require('./compress')
const tencent = require('./providers/tencent')
async function deployLayer (opt) {
  const dirpath = opt.dirpath
  const {
    path
  } = await compress(dirpath)
  console.log('Compress successfully,zip path: ' + path)
  await tencent.upload({
  })
}

module.exports = {
  deployLayer,
  compress,
  tencent
}
