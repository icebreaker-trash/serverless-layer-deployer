const zip = require('..')
const fs = require('fs')
describe('lib/index.js', () => {
  test('default', async () => {
    await zip()
    expect(fs.existsSync('node_modules.zip')).toBe(true)
  })
})
