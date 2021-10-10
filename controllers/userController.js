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
  }
}

module.exports = userController