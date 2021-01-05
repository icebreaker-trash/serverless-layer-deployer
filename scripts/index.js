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
const layerPath = '.serverless\\node_modules.zip'
const Bucket = 'sls-layer-ap-shanghai-code-1257725330'
const Key = 'node_modules.zip'
async function main () {
  // const dirpath = path.resolve(__dirname, '../node_modules')
  // const {
  //   path: layerPath
  // } = await compress(dirpath)

  // const fileName = path.basename(layerPath)
  // console.log(fileName)
  // const {
  //   Bucket,
  //   Key
  // } = await tencent.upload({
  //   Bucket: TENCENT_COS_LAYER_BUCKET,
  //   FilePath: layerPath,
  //   Key: fileName,
  //   Region: TENCENT_COS_LAYER_REGION,
  //   SecretId: TENCENT_SECRET_ID,
  //   SecretKey: TENCENT_SECRET_KEY
  // })

  // tencent.generateYml({
  //   name: 'layer-test-202101',
  //   inputs: {
  //     name: 'sls-layer-deploy-test',
  //     region: 'ap-shanghai',
  //     src: {
  //       bucket: Bucket,
  //       object: '/' + Key
  //       // exclude:[
  //       //   'sss'
  //       // ]
  //     },
  //     description: 'auto deploy by serverless-layer-deployer'
  //   }
  // })

  // console.log("i'm the last")

  process.chdir('./.serverless/layer')
  try {
    const res = await tencent.serverlessDeploy()
    console.log(res)
  } catch (err) {
    console.log(err)
  }
}

main()
