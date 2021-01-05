/**
 * @aws
 * @link https://github.com/serverless-components/aws-lambda-layer
 * @doc https://github.com/serverless-components/aws-lambda-layer/blob/master/README.md
 *
 * @tencent
 * @link https://github.com/serverless-components/tencent-layer
 * @doc https://github.com/serverless-components/tencent-layer/blob/master/docs/configure.md
 */
const merge = require('lodash.merge')
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
      runtimes: ['Nodejs10.15', 'Nodejs12.16']
    }
  }
  return merge({}, config, option)
}
