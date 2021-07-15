const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { dateToString } = require('../../public/javascripts/tools')

router.get('/', async (req, res) => {
  const categories = await Category.find().lean()
  const categoryData = {}
  categories.forEach(category => categoryData[category.categoryName] = category.categoryIcon)

  return Record.find()
    .lean()
    .then(records => {
      let totalAmount = 0
      records.map(record => {
        record.date = dateToString(record.date)
        totalAmount += record.amount
        record.categoryIcon = categoryData[record.category]
      })
      res.render('index', { records, totalAmount })
    })
    .catch(err => console.error(err))
})

// filter by category
router.get('/filter', async (req, res) => {
  const categoryEngName = req.query.category
  const category = await Category.findOne({ categoryEngName })

  if (!category) return res.redirect('/')

  return Record.find({ category: category.categoryName })
    .lean()
    .then(records => {
      let totalAmount = 0
      records.map(record => {
        record.date = dateToString(record.date)
        totalAmount += record.amount
        record.categoryIcon = category.categoryIcon
      })
      res.render('index', { records, totalAmount, category: category.categoryName })
    })

})

module.exports = router