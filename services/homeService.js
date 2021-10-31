const express = require('express')
const Record = require('../models/record')
const Category = require('../models/category')
const { inputValidation } = require('../public/javascripts/tools')

const homeService = {
  getUserRecords: async (userId) => {
    return await Record.find({ userId, isDelete: false })
      .sort({ date: 'asc' })
      .lean()
  }
}

module.exports = homeService