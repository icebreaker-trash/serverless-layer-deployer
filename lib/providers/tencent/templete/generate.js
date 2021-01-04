/**
 * @link https://github.com/serverless-components/tencent-layer
 * @doc https://github.com/serverless-components/tencent-layer/blob/master/docs/configure.md
 */

module.exports = function (option) {
  const config = {
    component: 'layer',
    stage: 'dev',
    inputs: {
      src: {
        // Cos bucket 名称。
        bucket: '',
        // Cos 存储桶中的路径
        object: ''
      },
      runtimes: ['Nodejs10.14', 'Nodejs12.16']
    }
  }
  if (option.name) {
    config.name = option.name
  }
  if (option.org) {
    config.org = option.org
  }
  if (option.app) {
    config.app = option.app
  }
  if (option.stage) {
    config.stage = option.stage
  }
  if (option.region) {
    config.inputs.region = option.region
  }
  if (option.layerName) {
    config.inputs.name = option.layerName
  }
  return config
}
