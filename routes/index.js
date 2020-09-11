const express = require('express')
const route = express.Router()

const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const search = require('./modules/search')
const sort = require('./modules/sort')

route.use('/', home)
route.use('/restaurants', restaurant)
route.use('/search', search)
route.use('/sort', sort)

module.exports = route