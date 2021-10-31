const { deployTencentLayer } = require('..')
const { deployByCos } = require('../lib/providers/tencent/index')
const { yaml } = require('serverless-config-generator')
require('dotenv').config()
const fsp = require('fs').promises
const globalModules = require('global-modules')

const ymlExample = {
  name: 'layer-test-202101',
  inputs: {
    name: 'sls-layer-deploy-test',
    region: 'ap-shanghai',
    description: 'auto deploy by serverless-layer-deployer'
  }
}

async function main () {
  const res = await deployByCos({}, {
    name: 'layer-test-202101',
    inputs: {
      name: 'sls-layer-deploy-test',
      region: 'ap-shanghai',
      description: 'auto deploy by serverless-layer-deployer'
    }
    // option: {
    //   innerPath: 'node_modules'
    // }
  })
  console.log(res)
  // const res = await deployTencentLayer(ymlExample, {
  //   option: {
  //     innerPath: 'node_modules'
  //   }
  // })

  // // const { stdout } = res
  // await fsp.writeFile('./serverless.stdout.json', JSON.stringify(res), {
  //   encoding: 'utf8'
  // })
}

main()
