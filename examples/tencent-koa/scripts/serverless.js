module.exports = {
  component: 'koa',
  name: 'serverless-layer-deployer-tencent-koa-example',
  inputs: {
    functionName: 'serverless-layer-deployer-tencent-koa-example',
    serviceId: 'service-br6gv6w3',
    src: {
      src: '.',
      bucket: 'sls-cloudfunction-ap-shanghai-code',
      exclude: [
        'deploy.js',
        'serverless.js',
        'listener.js',
        'serverless.yml',
        'node_modules/**/*',
        '.serverless/**/*',
        'scripts/**/*',
        '.gitignore',
        'yarn.lock'
      ]
    },
    region: 'ap-shanghai',
    runtime: 'Nodejs12.16',
    layers: [
      {
        name: 'serverless-layer-deployer-tencent-koa-example-layer',
        version: 1
      }
    ]
  }
}
