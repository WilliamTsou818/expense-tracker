const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { dateToString, inputValidation} = require('../../public/javascripts/tools')

// new page
router.get('/new', async (req, res) => {
  let today = new Date()
  const categories = await Category.find().lean()
  today = dateToString(today)
  res.render('new', { today, categories })
})

// add new record
router.post('/new', (req, res) => {
  const record = req.body
  console.log(record)
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
      amount: record.amount,
      merchant: record.merchant
    })
      .then(() => {
        req.flash('success_messages', '已成功建立支出紀錄！')
        res.redirect('/')
      })
      .catch(err => console.error(err))
  }
})

// edit page
router.get('/:id', async (req, res) => {
  const id = req.params.id
  const categories = await Category.find().lean()
  if (!mongoose.Types.ObjectId.isValid(id)) return res.redirect('back')
  return Record.findById(id)
    .lean()
    .then(record => {
      if (!record) return res.redirect('back')
      const currentDate = dateToString(record.date)
      res.render('edit', { record, currentDate, categories })
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
        [record.name, record.category, record.date, record.amount, record.merchant] = [modifiedRecord.name, modifiedRecord.category, modifiedRecord.date, modifiedRecord.amount, modifiedRecord.merchant]
        return record.save()
      })
      .then(() => {
        req.flash('success_messages', '已成功修改支出紀錄！')
        res.redirect('/')
      })
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
    .then(() => {
      req.flash('success_messages', '已成功刪除支出紀錄！')
      res.redirect('/')
    })
    .catch(err => console.error(err))
})

module.exports = router
