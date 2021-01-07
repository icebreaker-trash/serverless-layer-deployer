const {
  deployLayer
} = require('..')
require('dotenv').config()

const ymlExample = {
  name: 'layer-test-202101',
  inputs: {
    name: 'sls-layer-deploy-test',
    region: 'ap-shanghai',
    description: 'auto deploy by serverless-layer-deployer'
  }
}

async function main () {
  await deployLayer(ymlExample)
}

main()
