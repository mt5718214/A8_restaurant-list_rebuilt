const express = require('express')
const app = express()

const mongoose = require('mongoose')
const db = mongoose.connection

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  res.send('this is restaurantList')
})


app.listen(3000, () => {
  console.log('Express is running on http://localhost:3000')
})