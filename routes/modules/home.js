const express = require('express')
const router = express.Router()
const homeController = require('../../controllers/homeController')

router.get('/', homeController.getHomePage)

// filter by category or month
router.get('/filter', homeController.getFilteredRecords)

module.exports = router
