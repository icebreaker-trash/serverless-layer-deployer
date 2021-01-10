const fsp = require('fs').promises
const globalModules = require('global-modules')
const serverlessConfigLayerVersionRegExp = /version:\s*(\d+)/
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

module.exports = {
  overrideLayerVersion,
  checkIsServerlessInstalledGlobally
}
