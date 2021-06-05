// include modules
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const Record = require('./models/record')


const port = 3000

const dateToString = require('./scripts/index')
require('./config/mongoose')


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')


app.get('/', (req, res) => {
  return Record.find()
    .lean()
    .then(records => {
      records.forEach(record => record.date = dateToString(record.date))
      res.render('index', { records })
    })
    .catch(err => console.error(err))
})

app.listen(port, () => {
  console.log('Server is running on http://localhost:3000')
})