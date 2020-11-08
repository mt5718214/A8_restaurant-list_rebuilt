const express = require('express')
const route = express.Router()
const Restaurant = require('../../models/restaurant')

route.get('/asc', (req, res) => {
  const userId = req.user._id
  return Restaurant.find({ userId })
    .lean()
    .sort({ name: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
})

route.get('/desc', (req, res) => {
  const userId = req.user._id
  return Restaurant.find({ userId })
    .lean()
    .sort({ name: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
})

route.get('/category', (req, res) => {
  const userId = req.user._id
  return Restaurant.find({ userId })
    .lean()
    .sort({ category: 'asc' })
    .then(restaurants => res.render('index', { restaurants }))
})

route.get('/rating', (req, res) => {
  const userId = req.user._id
  return Restaurant.find({ userId })
    .lean()
    .sort({ rating: 'desc' })
    .then(restaurants => res.render('index', { restaurants }))
})

module.exports = route