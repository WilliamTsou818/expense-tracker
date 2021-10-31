const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('../../controllers/authController')

router.get('/facebook', authController.getFbLogin)

router.get('/facebook/callback', authController.fbLoginCallback)

router.get('/google', authController.getGoogleLogin)

router.get('/google/callback', authController.googleLoginCallback)

module.exports = router
