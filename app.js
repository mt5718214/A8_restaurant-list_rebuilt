const express = require('express')
const app = express()

const mongoose = require('mongoose')
const db = mongoose.connection

const Restaurant = require('./models/restaurant')

const bodyParser = require('body-parser')

const exphbs = require('express-handlebars')

const methodOverride = require('method-override')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  return Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find()
    .lean()
    .then(restaurants => {
      return restaurants.filter(restaurant => restaurant.name.includes(keyword) || restaurant.name_en.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword))
    })
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.post('/restaurants/new', (req, res) => {
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

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const requestBody = req.body
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant = Object.assign(restaurant, requestBody)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

app.delete('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('Express is running on http://localhost:3000')
})