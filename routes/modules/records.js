const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { dateToString, inputValidation } = require('../../public/javascripts/tools')
const recordController = require('../../controllers/recordController')

// new page
router.get('/new', recordController.getNewRecordPage)

// add new record
router.post('/new', async (req, res) => {
  const userId = req.user._id
  const record = req.body
  const validation = inputValidation(record)
  if (Object.values(validation).includes(false)) {
    let today = new Date()
    today = dateToString(today)
    const categories = await Category.find().lean()
    res.render('new', { validation, today, record, categories })
  } else {
    await Record.create({
      name: record.name,
      date: record.date,
      category: record.category,
      amount: record.amount,
      merchant: record.merchant,
      userId
    })
    req.flash('success_messages', '已成功建立支出紀錄！')
    return res.redirect('/')
  }
})

// edit page
router.get('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const categories = await Category.find().lean()

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.redirect('back')
    const record = await Record.findOne({ _id, userId }).lean()
    if (!record) return res.redirect('back')
    const currentDate = dateToString(record.date)
    return res.render('edit', { record, currentDate, categories })
  } catch (error) {
    console.error(error)
  }
})

// edit record
router.put('/:id', async (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const modifiedRecord = req.body
  const validation = inputValidation(modifiedRecord)
  if (Object.values(validation).includes(false)) {
    const categories = await Category.find().lean()
    const record = await Record.findOne({ _id, userId }).lean()
    const currentDate = dateToString(record.date)
    return res.render('edit', { record, currentDate, validation, categories })
  } else {
    const recordFilter = { _id, userId }
    await Record.findOneAndUpdate(recordFilter, modifiedRecord, {
      useFindAndModify: false
    })
    req.flash('success_messages', '已成功修改支出紀錄！')
    return res.redirect('/')
  }
})

// delete record
router.delete('/:id', async (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(_id)) return res.redirect('back')
  const record = await Record.findOne({ _id, userId })
  if (!record) return res.redirect('back')
  record.isDelete = true
  record.save()

  req.flash('success_messages', '已成功刪除支出紀錄！')
  return res.redirect('/')
})

module.exports = router
