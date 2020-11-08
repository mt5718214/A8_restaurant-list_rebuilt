const express = require('express')
const route = express.Router()

const Restaurant = require('../../models/restaurant')

route.get('/', (req, res) => {
  const userId = req.user._id
  return Restaurant.find({ userId })
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

module.exports = route