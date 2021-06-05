// include modules
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')


const port = 3000

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log('Server is running on http://localhost:3000')
})