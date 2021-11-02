// include modules
const express = require('express')
const exphbs = require('express-handlebars')
const hbshelpers = require('handlebars-helpers')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const routes = require('./routes')
const usePassport = require('./config/passport')

// include .env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

require('./config/mongoose')

// include redis
const redis = require('redis')
const redisClient = redis.createClient()

// express related variables
const PORT = process.env.PORT
const app = express()
const multihelpers = hbshelpers()

// view engine setting
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: multihelpers }))
app.set('view engine', 'hbs')

// middleware and routes setting
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  next()
})

usePassport(app)
app.use(flash())

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use(routes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
