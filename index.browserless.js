let browser = require('browserless')()
let faker = require("faker")
let path = require('path')

browser.screenshot("https://www.offleaseonly.com/used-cars.htm", {
  tmpOpts: {
    path: path.resolve(__dirname),
    name: faker.lorem.slug()
  }
}).then(file => {
  console.log(`your screenshot at ${file.path}`)
  file.cleanupSync()
})