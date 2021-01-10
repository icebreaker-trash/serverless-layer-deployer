const fsp = require('fs').promises
const globalModules = require('global-modules')
const path = require('path')
const serverlessConfigLayerVersionRegExp = /version:\s*['"`]?(\d+)['"`]?/

/**
 *
 * @param {String|Number} version
 * @param {String} serverlessConfigPath
 */
async function overrideLayerVersion (version, serverlessConfigPath) {
  const serverlessPath = serverlessConfigPath
  const res = await fsp.readFile(serverlessPath, {
    encoding: 'utf-8'
  })
  const rep = res.replace(
    serverlessConfigLayerVersionRegExp,
    `version: ${version}`
  )
  await fsp.writeFile(serverlessPath, rep, {
    encoding: 'utf-8'
  })
}

async function checkIsServerlessInstalledGlobally () {
  const gms = await fsp.readdir(globalModules)
  const hasInstalledServerless = gms.includes('serverless')
  return hasInstalledServerless
}

function getDefaultCompressOption () {
  const cwdPath = process.cwd()
  return {
    dirpath: path.resolve(cwdPath, 'node_modules'),
    destpath: path.resolve(cwdPath, '.serverless/layer/node_modules.zip'),
    option: {
      innerPath: false
    }
  }
}

function getDefaultCosOption () {
  return {
    Bucket: process.env.TENCENT_COS_LAYER_BUCKET,
    Region: process.env.TENCENT_COS_LAYER_REGION,
    SecretId: process.env.TENCENT_SECRET_ID,
    SecretKey: process.env.TENCENT_SECRET_KEY
  }
}

module.exports = {
  overrideLayerVersion,
  checkIsServerlessInstalledGlobally,
  getDefaultCompressOption,
  getDefaultCosOption
}
