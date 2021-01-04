const zip = require('../lib/compress')
const path = require('path')
async function main () {
  const dirpath = path.resolve(__dirname, '../node_modules')
  await zip(dirpath)
  console.log("i'm the last")
}

main()
