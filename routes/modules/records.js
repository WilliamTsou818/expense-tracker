const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Record = require('../../models/record')
const { dateToString, inputValidation} = require('../../public/javascripts/tools')

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
  if (!mongoose.Types.ObjectId.isValid(id)) return res.redirect('back')
  return Record.findById(id)
    .lean()
    .then(record => {
      if (!record) return res.redirect('back')
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
  if (!mongoose.Types.ObjectId.isValid(id)) return res.redirect('back')
  return Record.findById(id)
    .then(record => {
      if (!record) return res.redirect('back')
      record.isDelete = true
      record.save()
    })
    .then(() => res.redirect('/'))
    .catch(err => console.error(err))
})

module.exports = router