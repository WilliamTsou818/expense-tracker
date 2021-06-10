const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { dateToString, inputValidation} = require('../../public/javascripts/tools')

// filter category
router.get('/filter', (req, res) => {
  const categoryEngName = req.query.category
  const categoryData = {
    'home': '家居物業',
    'transportation': '交通出行',
    'entertainment': '休閒娛樂',
    'food': '餐飲食品', 
    'others': '其他'
  }
  const category = categoryData[categoryEngName]

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

// new page
router.get('/new', (req, res) => {
  let today = new Date()
  today = dateToString(today)
  res.render('new', { today })
})

// add new record
router.post('/new', (req, res) => {
  const record = req.body
  const validation = inputValidation(record)
  if (Object.values(validation).includes(false)) {
    let today = new Date()
    today = dateToString(today)
    res.render('new', { validation, today, record })
  } else {
    return Record.create({
      name: record.name,
      date: record.date,
      category: record.category,
      amount: record.amount
    })
      .then(() => res.redirect('/'))
      .catch(err => console.error(err))
  }
})

// edit page
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .lean()
    .then(record => {
      const currentDate = dateToString(record.date)
      res.render('edit', { record, currentDate })
    })
    .catch(err => console.error(err))
})

// edit record
router.put('/:id', (req, res) => {
  const id = req.params.id
  const modifiedRecord = req.body
  const validation = inputValidation(modifiedRecord)
  if (Object.values(validation).includes(false)) {
    return Record.findById(id)
      .lean()
      .then(record => {
        const currentDate = dateToString(record.date)
        res.render('edit', { record, currentDate, validation })
      })
      .catch(err => console.error(err))
  } else {
    return Record.findById(id)
      .then(record => {
        [record.name, record.category, record.date, record.amount] = [modifiedRecord.name, modifiedRecord.category, modifiedRecord.date, modifiedRecord.amount]
        return record.save()
      })
      .then(() => res.redirect('/'))
      .catch(err => console.error(err))
  }
})

// delete record
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Record.findById(id)
    .then(record => record.remove())
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router