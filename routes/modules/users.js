const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const userController = require('../../controllers/userController')

router.get('/login', userController.getLoginPage)

router.post('/login', userController.postLogin)

router.get('/register', userController.getRegisterPage)

router.post('/register', userController.register)

router.get('/logout', userController.logout)

module.exports = router
