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
  },

  postNewRecord: async (req, res, next) => {
    try {
      const userId = req.user._id
      // Check inputs are valid or create new record
      const postRecordResult = await recordService.postRecord(req.body, userId)
      if (postRecordResult.status === 'error') {
        const today = dateToString(new Date())
        const categories = await recordService.getCategories()
        return res.render('new', {
          validation: postRecordResult.validation,
          today,
          record: req.body,
          categories
        })
      }

      // Success to create new record
      req.flash('success_messages', postRecordResult.message)
      return res.redirect('/')
    } catch (error) {
      next(error)
    }
  },

  getEditPage: async (req, res, next) => {
    try {
      const userId = req.user._id
      const _id = req.params.id
      // Check param id is valid mongo object id
      if (!mongoose.Types.ObjectId.isValid(_id)) return res.redirect('back')
      // Check if the record exists
      const record = await recordService.getRecord(_id, userId)
      if (!record) return res.redirect('back')
      
      const categories = await recordService.getCategories()
      const currentDate = dateToString(record.date)
      return res.render('edit', { record, currentDate, categories })
    } catch (error) {
      next(error)
    }
  },

  putRecord: async (req, res, next) => {
    try {
      const userId = req.user._id
      const _id = req.params.id
      const recordFilter = { _id, userId }
      const putRecordResult = await recordService.putRecord(req.body, recordFilter)
      // Check if inputs are valid or put the record successfully
      if (putRecordResult.status === 'error') {
        const record = await recordService.getRecord(_id, userId)
        const categories = await recordService.getCategories()
        const currentDate = dateToString(record.date)
        return res.render('edit', {
          record,
          currentDate,
          validation: putRecordResult.validation,
          categories
        })
      }

      // Success to modify the record 
      req.flash('success_messages', putRecordResult.message)
      return res.redirect('/')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = recordController
