const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const { dateToString } = require('../../public/javascripts/tools')

router.get('/', (req, res) => {
  return Record.find()
    .lean()
    .then(records => {
      records.forEach(record => record.date = dateToString(record.date))
      let totalAmount = 0
      records.forEach(record => totalAmount += record.amount)
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.error(err))
})

module.exports = router