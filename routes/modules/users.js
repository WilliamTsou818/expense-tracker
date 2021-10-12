const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const userController = require('../../controllers/userController')

router.get('/login', userController.login)

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', userController.getRegisterPage)

router.post('/register', async (req, res) => {
  const { name, email, password, comfirmPassword } = req.body
  // check input data
  const errors = []
  if (!name || !email || !password || !comfirmPassword) {
    errors.push({ message: '所有欄位都是必填資料。' })
  }
  if (password !== comfirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符。' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email
    })
  }

  const user = await User.findOne({ email })
  // check user data
  if (user) {
    errors.push({ message: '該 email 已經被註冊。' })
    return res.render('register', { errors, name, email })
  }
  // create user account with hash password
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  await User.create({ name, email, password: hash })
  return res.redirect('/users/login')
})

router.get('/logout', userController.logout)

module.exports = router
