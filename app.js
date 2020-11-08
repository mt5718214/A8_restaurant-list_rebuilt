const express = require('express')
const routes = require('./routes')
const bodyParser = require('body-parser')
const session = require('express-session')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const app = express()

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(routes)

app.listen(3000, () => {
  console.log('Express is running on http://localhost:3000')
})