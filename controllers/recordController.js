const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const recordService = require('../services/recordService')
const { dateToString, inputValidation } = require('../public/javascripts/tools')

const recordController = {
  getNewRecordPage: async (req, res, next) => {
    try {
      const today = dateToString(new Date())
      const categories = await recordService.getCategories()
      return res.render('new', { today, categories })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = recordController