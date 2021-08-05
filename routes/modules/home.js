const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const Category = require('../../models/category')
const { dateToString } = require('../../public/javascripts/tools')

router.get('/', async (req, res) => {
  const userId = req.user._id
  const categories = await Category.find().lean()
  const categoryData = {}
  categories.forEach(category => categoryData[category.categoryName] = category.categoryIcon)

  return Record.find({ userId, isDelete: false })
    .sort({ date: 'asc' })
    .lean()
    .then(records => {
      let totalAmount = 0
      records.map(record => {
        record.date = dateToString(record.date)
        totalAmount += record.amount
        record.categoryIcon = categoryData[record.category]
      })
      res.render('index', { records, totalAmount, categories })
    })
    .catch(err => console.error(err))
})

// filter by category
router.get('/filter', async (req, res) => {
  const categoryName = req.query.category
  const monthFiltered = req.query.month
  const categories = await Category.find().lean()
  let category = await Category.findOne({ categoryName })

  if (category === null) category = { categoryName: '' }
  if (!category && !monthFiltered) return res.redirect('/')

  return Record.find({ category: category.categoryName, isDelete: false })
    .sort({ date: 'asc' })
    .lean()
    .then(records => {
      // filter by month
      if (monthFiltered) {
        records = records.filter((record) => {
          const date = record.date
          const recordMonth = String(date.getMonth() + 1)
          return recordMonth === monthFiltered
        })
      }

      let totalAmount = 0
      records = records.map(record => {
        record.date = dateToString(record.date)
        totalAmount += record.amount
        record.categoryIcon = category.categoryIcon
      })
      res.render('index', { records, totalAmount, currentCategory: category.categoryName, categories, monthFiltered })
    })
})

module.exports = router
