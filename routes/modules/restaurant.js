const express = require('express')
const route = express.Router()

const Restaurant = require('../../models//restaurant')

route.get('/new', (req, res) => {
  return res.render('new')
})

route.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

route.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

route.post('/new', (req, res) => {
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
  const id = req.params.id
  const requestBody = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      if (requestBody.name === '') {
        requestBody.name = '未命名'
      }
      restaurant = Object.assign(restaurant, requestBody)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

route.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = route