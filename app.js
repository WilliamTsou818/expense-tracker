// include modules
const express = require('express')
const exphbs = require('express-handlebars')
const hbshelpers = require('handlebars-helpers')
const methodOverride = require('method-override')
const routes = require('./routes')
require('./config/mongoose')

// express related variables
const port = process.env.PORT || 3000
const app = express()
const multihelpers = hbshelpers()

// view engine setting
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: multihelpers }))
app.set('view engine', 'hbs')

// middleware and routes setting
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(routes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})