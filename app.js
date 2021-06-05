// include modules
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const hbshelpers = require('handlebars-helpers');
const multihelpers = hbshelpers();
const Record = require('./models/record')
const methodOverride = require('method-override')

const port = 3000

const dateToString = require('./scripts/index')
require('./config/mongoose')


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: multihelpers }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  return Record.find()
    .lean()
    .then(records => {
      records.forEach(record => record.date = dateToString(record.date))
      res.render('index', { records })
    })
    .catch(err => console.error(err))
})

app.get('/expense-tracker/new', (req, res) => {
  res.render('new')
})

app.post('/expense-tracker/new', (req, res) => {
  const record = req.body
  return Record.create({ 
    name: record.name,
    date: record.date,
    category: record.category,
    amount: record.amount 
  })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

app.get('/expense-tracker/:id/edit', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => {
      const currentDate = dateToString(record.date)
      res.render('edit', { record, currentDate })
    })
    .catch(err => console.error(err))
})

app.listen(port, () => {
  console.log('Server is running on http://localhost:3000')
})