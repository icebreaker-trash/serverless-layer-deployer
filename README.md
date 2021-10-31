# serverless-layer-deployer

> help you deploy layer smoothly

## Now

- [x] Tencent Cloud layer deploy support

- [ ] AWS layer deploy support

> There is no need to install `serverless` or `@serverless/components` globally because this package is directly dependent on `@serverless/platform-client`.
## How to use?

```sh
npm i -D serverless-layer-deployer
# or
yarn add -D serverless-layer-deployer
```

then

```js
const {
  deployTencentLayer
} = require('serverless-layer-deployer')

// deployTencentLayer has 3 arg arguments
// ymlOpion , compressOption and cosOption
const ymlOpt = {
  // Required
  name:'this-is-my-first-layer',
  // Optional
  stage: 'dev',//default 'dev'
  inputs:{
    // Required
    name:'webapi-runtime-layer',
    region: 'ap-shanghai',

    // Optional
    description: 'hello world? yes',
    runtimes: ['Nodejs10.15', 'Nodejs12.16']
  }
}
;(async ()=>{
  // full argument
  await deployTencentLayer(ymlOpt,compressOpt,cosOpt)
  // or with defalut cosOption
  await deployTencentLayer(ymlOpt,compressOpt)
  // or with all defalut compressOption cosOption

  // serverless framework deploy response
  const deployResponse = await deployTencentLayer(ymlOpt)

  const { outputs ,state, inputs , ... } =  deployResponse
  // example 
  // description: null,
  // instanceStatus: 'active',
  // deploymentError: null,
  // deploymentErrorStack: null,
  // lastAction: 'deploy',
  // createdAt: 1609839132795,
  // updatedAt: 1635680031852,
  // lastDeployedAt: 1635680024519,
  // lastActionAt: 1635680024519,
  // instanceMetrics: { actions: 28, deployments: 28, removes: 0, errors: 5 },
  // appUid: 's1DsrTTC39nKN9h78K',
  // orgUid: 1257725330,
  // instanceId: '1257725330.dev.s1DsrTTC39nKN9h78K.layer-test-202101',
  // deploymentErrorDetail: 'Cannot create layer success in 2 minutes, status: PublishFailed(reqId: adc62fa6-6eb6-4ae2-bb08-8636fd853158)',
  // deploymentErrorType: 'API_LAYER_GetLayerVersion',
  // deploymentErrorCode: null

  //the method will override the version in your serverless deploy config file

  //view more in examples
    
  
}) 

```

## Option

| params                  | type   |                              default                              | desc                            |
| ----------------------- | ------ | :---------------------------------------------------------------: | ------------------------------- |
| ymlOption               | Object |                                {}                                 | option to generate yml          |
| compressOption          | Object |                                                                   | compressOption                  |
| compressOption.dirpath  | String |            path.resolve(process.cwd(), 'node_modules')            | dirpath                         |
| compressOption.destpath | String | path.resolve(process.cwd(), '.serverless/layer/node_modules.zip') | destpath                        |
| cosOption               | Object |                            process.env                            | Tencent Cos Option              |
| cosOption.SecretId      | String |                         TENCENT_SECRET_ID                         | Tencent Cloud SecretId          |
| cosOption.SecretKey     | String |                        TENCENT_SECRET_KEY                         | Tencent Cloud SecretKey         |
| cosOption.Bucket        | String |                     TENCENT_COS_LAYER_BUCKET                      | Tencent Cloud Cos target Bucket |
| cosOption.Region        | String |                     TENCENT_COS_LAYER_REGION                      | Tencent Cloud Cos target Region |

You can see all Tencent Cloud Layer ymlOption [here](https://github.com/serverless-components/tencent-layer/blob/master/docs/configure.md)

## What the package does ?

1. use `archiver` to zip `node_modules`
2. upload `node_modules.zip` to OSS/COS
3. deploy serverless layer with `node_modules.zip` in OSS/COS
4. remove the `node_modules.zip` in OSS/COS for saving money (**optional**)

## Why use this package ?

`tencent-layer` will throw error when node_modules has too many files(65,536)

[issue link](https://github.com/serverless-components/tencent-layer/issues/6)
