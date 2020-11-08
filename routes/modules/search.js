const express = require('express')
const route = express.Router()

const Restaurant = require('../../models/restaurant')

route.get('/', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword
  Restaurant.find({ userId })
    .lean()
    .then(restaurants => {
      return restaurants.filter(restaurant => restaurant.name.includes(keyword) || restaurant.category.includes(keyword))
    })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

module.exports = route