const express = require('express')
const Record = require('../models/record')
const Category = require('../models/category')
const { inputValidation } = require('../public/javascripts/tools')

const homeService = {
  getUserRecords: async (userId) => {
    return await Record.find({ userId, isDelete: false })
      .sort({ date: 'asc' })
      .lean()
  },

  getFilteredRecords: async (filterQuery) => {
    return await Record.aggregate([
      {
        $project: {
          name: 1,
          category: 1,
          date: 1,
          amount: 1,
          merchant: 1,
          userId: 1,
          isDelete: 1,
          month: { $month: '$date' }
        }
      },
      { $match: filterQuery }
    ])
  }
}

module.exports = homeService