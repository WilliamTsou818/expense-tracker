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
router.delete('/:id', recordController.deleteRecord)

module.exports = router
