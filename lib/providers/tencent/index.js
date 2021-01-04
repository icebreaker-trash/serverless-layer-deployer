const upload = require('./upload')
const getLayerTemplete = require('./templete/generate.js')
const yaml = require('js-yaml')
const fs = require('fs')
const fsp = fs.promises
const execa = require('execa')
module.exports = async function (cosOpt) {
  const { Key, Bucket } = await upload(cosOpt)
  const yml = yaml.dump(
    getLayerTemplete({
      inputs: {
        src: {
          bucket: Bucket,
          object: Key
        }
      }
    })
  )
  await fsp.writeFile('serverless.yml', yml)
  const res = await execa('serverless', ['deploy'])
  console.log(res)
}
