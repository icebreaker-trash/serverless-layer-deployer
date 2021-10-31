const { deployTencentLayer } = require('../../lib')
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')
})
require('dotenv').config()
const fsp = require('fs').promises

console.log(process.env.TENCENT_COS_LAYER_BUCKET)
const ymlOpt = {
  name: 'serverless-layer-deployer-tencent-koa-example',
  inputs: {
    name: 'serverless-layer-deployer-tencent-koa-example-layer',
    region: 'ap-shanghai'
  }
}
  ; (async () => {
  const res = await deployTencentLayer(ymlOpt)

  await fsp.writeFile('./example.response.json', JSON.stringify(res))
})()
