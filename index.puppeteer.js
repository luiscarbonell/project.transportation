let pup = require('puppeteer')
let A = require('neo-async')
let Promise = require('bluebird')
let faker = require('faker')

let MAKES = {}

function getMakes() {
  return new Promise(async (resolve, reject) => {
    try {
      let browser = await pup.launch()
      let page = await browser.newPage()

      await page.goto("https://www.offleaseonly.com/used-cars.htm")

      // Get All Car Makes
      let MAKES = await page.evaluate(() => {
        let makes = document.querySelectorAll("select.make option:not([value='']")

        let MAKES = []

        makes.forEach(function(make) {
          let url = "https://www.offleaseonly.com/used-" + make.value + ".htm"
          let value = make.innerHTML.split(" ")
          value.pop()
          value = value.join(" ")

          MAKES.push({
            url,
            value
          })
        })

        return MAKES
      })

      browser.close()
      
      return resolve(MAKES)
    } catch (e) {
      return reject(e)
    }
  })
}

function getModels(url) {
  return new Promise(async (resolve, reject) => {
    try {
      let browser = await pup.launch()
      let page = await browser.newPage()

      await page.goto(url)

      // Get All Car Makes
      let MODELS = await page.evaluate(() => {
        let models = document.querySelectorAll("select.model option:not([value='']")

        let MODELS = []

        models.forEach(function(model) {
          let url = "https://www.offleaseonly.com/used-" + model.value + ".htm"
          let value = model.innerHTML.split(" ")
          value.pop()
          value = value.join(" ")

          MODELS.push({
            url,
            value
          })
        })

        return MODELS
      })

      browser.close()
      
      return resolve(MODELS)
    } catch (e) {
      return reject(e)
    }
  })
}

function getTrims(url) {
  
}

getMakes().then(function(makes) {
  A.eachSeries(makes, function(make, callback) {
    console.log("Make: " + make.value)
    
    getModels(make.url).then(function(models) {
      A.eachSeries(models, function(model, callback) {
        console.log("\tModel: " + model.value)
        
        callback()
      }, callback)
    }).catch(callback)
    
  }, function(error) {
    console.log("Error: " + error)
  })
}).catch(function(error) {
  console.log(error)
})