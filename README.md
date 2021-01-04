# serverless-layer-deployer

> help you deploy layer smoothly
## Before install

you should install serverless globally

```sh
npm i -g serverless
```

## What the package does ?

1. use `archiver` to zip `node_modules`
2. upload `node_modules.zip` to OSS/COS
3. deploy serverless layer with `node_modules.zip` in OSS/COS
4. remove the `node_modules.zip` in OSS/COS for saving money (**optional**)

## Why use this package ?

`tencent-layer` will throw error when node_modules has too many files(65,536)

[issue link](https://github.com/serverless-components/tencent-layer/issues/6)