const express = require('express')
const route = express.Router()

const home = require('./modules/home')
const restaurant = require('./modules/restaurant')
const search = require('./modules/search')
const sort = require('./modules/sort')
const users = require('./modules/users')
const auth = require('./modules/auth')

const { authenticator } = require('../middleware/auth')

route.use('/users', users)
route.use('/auth', auth)
route.use('/restaurants', authenticator, restaurant)
route.use('/search', authenticator, search)
route.use('/sort', authenticator, sort)
route.use('/', authenticator, home)

module.exports = route