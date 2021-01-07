const { deployTencentLayer } = require('../..')
const path = require('path')
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')
})
console.log(process.env.TENCENT_COS_LAYER_BUCKET)
const ymlOpt = {
  name: 'serverless-layer-deployer-tencent-koa-example',
  inputs: {
    name: 'serverless-layer-deployer-tencent-koa-example-layer',
    region: 'ap-shanghai'
  }
}
;(async () => {
  await deployTencentLayer(ymlOpt)
})()
