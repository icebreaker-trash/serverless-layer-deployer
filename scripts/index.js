const { deployTencentLayer } = require('..')
const { yaml } = require('serverless-config-generator')
require('dotenv').config()
const fsp = require('fs').promises
const globalModules = require('global-modules')
const stripAnsi = require('strip-ansi')
const ymlExample = {
  name: 'layer-test-202101',
  inputs: {
    name: 'sls-layer-deploy-test',
    region: 'ap-shanghai',
    description: 'auto deploy by serverless-layer-deployer'
  }
}

async function main () {
  // const data = await fsp.readFile('.serverless/layer/serverless.stdout.txt', {
  //   encoding: 'utf-8'
  // })
  // const strippedStr = stripAnsi(data)
  // const endLine = 'aNA\n'
  // const p = strippedStr.lastIndexOf(endLine)
  // const q = strippedStr.lastIndexOf('Full details')
  // const target = strippedStr.substring(p + endLine.length, q)

  // const yyy = yaml.load(target)
  // console.log(target, yyy)

  // const unhandleString =
  // console.log(unhandleString)
  const res = await deployTencentLayer(ymlExample, {
    option: {
      innerPath: 'node_modules'
    }
  })

  // const { stdout } = res
  await fsp.writeFile('./serverless.stdout.json', JSON.stringify(res), {
    encoding: 'utf8'
  })
}

main()
