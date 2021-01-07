const {
  deployLayer,
  compress,
  tencent
} = require('..')
require('dotenv').config()
const path = require('path')
const {
  TENCENT_SECRET_ID,
  TENCENT_SECRET_KEY,
  TENCENT_COS_LAYER_BUCKET,
  TENCENT_COS_LAYER_REGION
} = process.env

const ymlExample = {
  name: 'layer-test-202101',
  inputs: {
    name: 'sls-layer-deploy-test',
    region: 'ap-shanghai',
    description: 'auto deploy by serverless-layer-deployer'
  }
}

async function main () {
  const dirpath = path.resolve(__dirname, '../node_modules')
  const destpath = path.resolve(__dirname, '../.serverless/layer/node_modules.zip')
  await deployLayer({
    destpath,
    dirpath
  }, {}, ymlExample)
}

main()
