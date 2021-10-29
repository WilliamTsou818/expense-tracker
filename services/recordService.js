const express = require('express')
const router = express.Router()
const Record = require('../models/record')
const Category = require('../models/category')

const recordService = {
  getCategories: async () => {
    return await Category.find().lean()
  }
}

module.exports = recordService