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
router.post('/new', recordController.postNewRecord)

// edit page
router.get('/:id', recordController.getEditPage)

// edit record
router.put('/:id', recordController.putRecord)

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
