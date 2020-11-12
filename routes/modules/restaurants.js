const express = require('express')
const route = express.Router()

const Restaurant = require('../../models/restaurant')

route.get('/new', (req, res) => {
  return res.render('new')
})

route.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

route.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

route.post('/new', (req, res) => {
  const userId = req.user._id
  req.body.userId = userId

  if (req.body.name === '') {
    req.body.name = '未命名'
    return Restaurant.create(req.body)
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  } else {
    return Restaurant.create(req.body)
      .then(() => res.redirect('/'))
      .catch(error => console.log(error))
  }
})

route.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const requestBody = req.body
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      if (requestBody.name === '') {
        requestBody.name = '未命名'
      }
      restaurant = Object.assign(restaurant, requestBody)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

route.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = route