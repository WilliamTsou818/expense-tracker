const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const { registerInputValidation } = require('../public/javascripts/tools')
const userService = require('../services/userService')

const userController = {
  getLoginPage: async (req, res, next) => {
    try {
      const warning_msg = res.locals.warning_msg
      const errors = req.flash('error')

      // handle login error message
      if (errors[0] === 'Missing credentials') {
        errors[0] = '請輸入有效 Email 與密碼'
      }

      return res.render('login', { warning_msg, errors })
    } catch (error) {
      next(error)
    }
  },

  postLogin: async (req, res, next) => {
    try {
      return passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
      })(req, res)
    } catch (error) {
      next(error)
    }
  },

  getRegisterPage: async (req, res, next) => {
    try {
      return res.render('register')
    } catch (error) {
      next(error)
    }
  },

  register: async (req, res, next) => {
    try {
      const { name, email } = req.body
      const errors = registerInputValidation(req.body)
      // If inputs are invalid, return errors
      if (errors.length) {
        return res.render('register', {
          errors,
          name,
          email
        })
      }
      
      const registerResult = await userService.register(req.body)
      // Register failed
      if (registerResult.status === 'error') {
        errors.push(registerResult.message)
        return res.render('register', {
          errors,
          name,
          email
        })
      }

      // Register success
      req.flash('success_msg', registerResult.message)
      return res.redirect('/users/login')
    } catch (error) {
      next(error)
    }
  },

  logout: async (req, res, next) => {
    try {
      req.logout()
      req.flash('success_msg', '您已成功登出。')
      res.redirect('/users/login')
    } catch (error) {
      next(error)
    }
  }
}

module.exports = userController
