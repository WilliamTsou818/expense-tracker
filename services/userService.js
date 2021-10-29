const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const userService = {
  register: async (reqBody) => {
    const { name, email, password } = reqBody
    // Check if the user exists
    const user = await User.findOne({ email })
    if (user)
      return { status: 'error', message: '該 email 已經被註冊。' }

    // Create new user
    const hash = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    await User.create({ name, email, password: hash })
    return { status: 'success', message: '已成功註冊。' }
  }
}

module.exports = userService
