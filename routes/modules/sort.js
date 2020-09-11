const express = require('express')
const route = express.Router()
const Restaurant = require('../../models/restaurant')

route.get('/asc', (req, res) => {
  return Restaurant.find()
    .lean()
    .sort({ name: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
})

route.get('/desc', (req, res) => {
  return Restaurant.find()
    .lean()
    .sort({ name: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
})

route.get('/category', (req, res) => {
  return Restaurant.find()
    .lean()
    .sort({ category: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
})

route.get('/rating', (req, res) => {
  return Restaurant.find()
    .lean()
    .sort({ rating: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
})

module.exports = route