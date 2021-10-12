const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const userController = {
  login: async (req, res, next) => {
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

  getRegisterPage: async (req, res, next) => {
    try {
      return res.render('register')
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