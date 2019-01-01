// This is a simple web scrapping script to pull listings
// from https://www.offleaseonly.com/used-cars.htm in a
// .CSV format

/**
* let makes = document.querySelectorAll("select.make option:not([value='']")
* 
* let OL_Makes = {}
* 
* makes.forEach(function(make) {
*   make = make.innerHTML.split(" ")
*   make.pop()
*   make = make.join(" ")
*   
*   OL_Makes[make] = {}
* })
*/
let OL_Makes = {
  "Acura": {},
  "Audi": {},
  "Bentley": {},
  "BMW": {},
  "Buick": {},
  "Cadillac": {},
  "Chevrolet": {},
  "Chrysler": {},
  "Dodge": {},
  "FIAT": {},
  "Ford": {},
  "Genesis": {},
  "GMC": {},
  "Honda": {},
  "Hyundai": {},
  "INFINITI": {},
  "Jaguar": {},
  "Jeep": {},
  "Kia": {},
  "Land Rover": {},
  "Lexus": {},
  "Lincoln": {},
  "Maserati": {},
  "Mazda": {},
  "McLaren": {},
  "Mercedes-Benz": {},
  "MINI": {},
  "Mitsubishi": {},
  "Nissan": {},
  "Porsche": {},
  "Ram": {},
  "Rolls Royce": {},
  "Scion": {},
  "Smart": {},
  "Subaru": {},
  "Tesla": {},
  "Toyota": {},
  "Volkswagen": {},
  "Volvo": {}
}

let DOM_listings = Array.from(document.querySelectorAll("div.vehicle-listing"))

DOM_listings.forEach(function(listing) {
  // Car Title
  let title = listing.querySelector("div.vehicle-title-wrap h6 a").innerHTML
  // Car's VIN #
  let vin = listing.querySelector("div.second-half.vehicle-specs div.container:nth-child(3) span.spec-data").innerHTML
  // Car's Transmission Type
  let transmission = listing.querySelector("div.first-half.vehicle-specs div.container:nth-child(1) span.spec-data").innerHTML
  // Car's Mileage
  let mileage = listing.querySelector("div.first-half.vehicle-specs div.container:nth-child(2) span.spec-data").innerHTML
  // Car's Kelly Blue Book Value
  let value = listing.querySelector("span.pricing-msrp-value").innerHTML
  // Car's Listing Price on OffLeaseOnly
  let price = listing.querySelector("span.pricing-ourprice").innerHTML

  mileage = parseFloat(mileage.split(",").join(""))
  price = parseFloat(price.replace("$", "").split(",").join(""))
  value = value === "Call Us" ? null : parseFloat(value.replace("$", "").split(",").join(""))

  // Year Manufactured
  let year = title.split(" ")[0]
  // Car's Drivetrain (e.g. FWD or 4x4)
  let drivetrain = title.split(" ")[title.split(" ").length - 1]
  // Savings (i.e Value - Price)
  let savings = value ? (value - price) : null

  year = parseFloat(year)

  let obj = {
    title,
    vin,
    year,
    transmission,
    drivetrain,
    mileage,
    value,
    price,
    savings
  }

  console.log(obj)
})
