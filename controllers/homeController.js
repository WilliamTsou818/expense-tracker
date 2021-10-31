const recordService = require('../services/recordService')
const homeService = require('../services/homeService')
const { dateToString } = require('../public/javascripts/tools')

const homeController = {
  getHomePage: async (req, res, next) => {
    try {
      const userId = req.user._id
      // handle categories data
      const categories = await recordService.getCategories()
      const categoryData = {}
      categories.forEach(
        (category) =>
          (categoryData[category.categoryName] = category.categoryIcon)
      )

      // handle records data
      const records = await homeService.getUserRecords(userId)
      let totalAmount = 0
      records.forEach((record) => {
        record.date = dateToString(record.date)
        totalAmount += record.amount
        record.categoryIcon = categoryData[record.category]
      })
      return res.render('index', { records, totalAmount, categories })
    } catch (error) {
      next(error)
    }
  },

  getFilteredRecords: async (req, res, next) => {
    try {
      const userId = req.user._id
      const categoryFiltered = req.query.category || ''
      const monthFiltered = Number(req.query.month) || ''

      // handle category icon
      const categories = await recordService.getCategories()
      const categoryData = {}
      categories.forEach(
        (category) =>
          (categoryData[category.categoryName] = category.categoryIcon)
      )

      // create mongoose aggregate filter query
      const filterQuery = {
        userId: userId,
        isDelete: false,
      }

      categoryFiltered ? filterQuery.category = categoryFiltered : ''
      monthFiltered ? filterQuery.month = monthFiltered : ''

      const records = await homeService.getFilteredRecords(filterQuery)

      // calculate total amount and transfer date format
      let totalAmount = 0
      records.forEach((record) => {
        record.date = dateToString(record.date)
        totalAmount += record.amount
        record.categoryIcon = categoryData[record.category]
      })

      return res.render('index', {
        records,
        totalAmount,
        categoryFiltered,
        categories,
        monthFiltered
      })
    } catch (error) {
      next(error)
    }
  }
}

module.exports = homeController
