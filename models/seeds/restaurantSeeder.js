const Restaurant = require('../restaurant')
const restaurantSeedData = require('../../restaurant')
const seedData = restaurantSeedData.results

const db = require('../../config/mongoose')

db.once('open', () => {
  seedData.forEach(restaurant => {
    Restaurant.create({
      name: restaurant.name,
      name_en: restaurant.name_en,
      category: restaurant.category,
      image: restaurant.image,
      location: restaurant.location,
      phone: restaurant.phone,
      google_map: restaurant.google_map,
      rating: restaurant.rating,
      description: restaurant.description
    })
  })
  console.log('Done')
})