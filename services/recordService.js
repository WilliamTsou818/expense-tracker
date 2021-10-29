const express = require('express')
const router = express.Router()
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
  }
}

module.exports = recordService