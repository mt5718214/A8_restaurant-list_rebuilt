const express = require('express')
const route = express.Router()

const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const search = require('./modules/search')

route.use('/', home)
route.use('/restaurants', restaurant)
route.use('/search', search)

module.exports = route