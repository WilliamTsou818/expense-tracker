const express = require('express')
const Record = require('../models/record')
const Category = require('../models/category')
const { inputValidation } = require('../public/javascripts/tools')

const recordService = {
  getCategories: async () => {
    return await Category.find().lean()
  },

  postRecord: async (record, userId) => {
    const { name, date, category, amount, merchant } = record
    // Check inputs are valid
    const validation = inputValidation(record)
    if (Object.values(validation).includes(false)) {
      return { status: 'error', validation }
    }
    
    // Create new record
    await Record.create({
      name,
      date,
      category,
      amount,
      merchant,
      userId
    })
    return { status: 'success', message: '已成功建立支出紀錄！' }
  },

  getRecord: async (_id, userId) => {
    return await Record.findOne({ _id, userId }).lean()
  },

  putRecord: async (record, recordFilter) => {
    // Check inputs are valid
    const validation = inputValidation(record)
    if (Object.values(validation).includes(false)) {
      return { status: 'error', validation }
    }
    
    // Modify record
    await Record.findOneAndUpdate(recordFilter, record, {
      useFindAndModify: false
    })
    return { status: 'success', message: '已成功修改支出紀錄！' }
  },

  deleteRecord: async (_id, userId) => {
    const record = await Record.findOne({ _id, userId })
    if (!record) return { status: 'error', message: '未找到支出紀錄' }

    record.isDelete = true
    record.save()
    return { status: 'success', message: '已成功刪除支出紀錄！' }
  }
}

module.exports = recordService