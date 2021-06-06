// include modules
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const hbshelpers = require('handlebars-helpers');
const multihelpers = hbshelpers();
const Record = require('./models/record')
const methodOverride = require('method-override')

const port = 3000

const {dateToString} = require('./public/tools')
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
      let totalAmount = 0
      records.forEach(record => totalAmount += record.amount)
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.error(err))
})

app.get('/expense-tracker/filter', (req, res) => {
  let category = req.query.category
  const category_en = ['home', 'trans', 'fun', 'food', 'others']
  const categoryData = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']
  category = categoryData[category_en.indexOf(category)]
  if (!category) return res.redirect('/')
  return Record.find({ category })
    .lean()
    .then(records => {
      records.forEach(record => record.date = dateToString(record.date))
      let totalAmount = 0
      records.forEach(record => totalAmount += record.amount)
      res.render('index', { records, totalAmount, category })
    }) 
    
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

app.get('/expense-tracker/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => {
      const currentDate = dateToString(record.date)
      res.render('edit', { record, currentDate })
    })
    .catch(err => console.error(err))
})

app.put('/expense-tracker/:id', (req, res) => {
  const id = req.params.id
  const modifiedRecord = req.body
  return Record.findById(id)
    .then(record => {
      [record.name, record.category, record.date, record.amount] = [modifiedRecord.name, modifiedRecord.category, modifiedRecord.date, modifiedRecord.amount]
      return record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

app.delete('/expense-tracker/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

app.listen(port, () => {
  console.log('Server is running on http://localhost:3000')
})