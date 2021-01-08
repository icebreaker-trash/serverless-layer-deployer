const { deployTencentLayer } = require('..')
require('dotenv').config()
const fsp = require('fs').promises
const ymlExample = {
  name: 'layer-test-202101',
  inputs: {
    name: 'sls-layer-deploy-test',
    region: 'ap-shanghai',
    description: 'auto deploy by serverless-layer-deployer'
  }
}

async function main () {
  // console.log(`[J[1mregion: [22m     ap-shanghai
  //   [1mname: [22m       sls-layer-deploy-test
  //   [1mbucket: [22m     sls-layer-ap-shanghai-code
  //   [1mobject: [22m     node_modules.zip
  //   [1mdescription: [22mauto deploy by serverless-layer-deployer
  //   [1mruntimes: [22m
  //   [32m  - [39mNodejs10.15
  //   [32m  - [39mNodejs12.16
  //   [1mversion: [22m    [34m12[39m`)
  const res = await deployTencentLayer(ymlExample, {
    option: {
      innerPath: 'node_modules'
    }
  })
  const { stdout } = res
  await fsp.writeFile('./serverless.stdout.txt', stdout, {
    encoding: 'utf8'
  })
}

main()
