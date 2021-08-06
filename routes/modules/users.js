const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

router.get('/login', (req, res) => {
  const warning_msg = res.locals.warning_msg
  const errors = req.flash('error')
  // handle login status authenticator warning message
  if (warning_msg.length !== 0) {
    return res.render('login', { warning_msg })
  }
  // handle login error message
  if (errors[0]) {
    errors[0] = { message: errors[0] }
    if (errors[0].message === 'Missing credentials') {
      errors[0] = { message: '請輸入有效 Email 與密碼' }
    }
    return res.render('login', { errors })
  }
  return res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, comfirmPassword } = req.body
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

  User.findOne({ email }).then((user) => {
    if (user) {
      errors.push({ message: '該 email 已經被註冊。' })
      return res.render('register', { errors, name, email })
    }
    // 儲存雜湊密碼
    return bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) =>
        User.create({
          name,
          email,
          password: hash
        })
      )
      .then(() => res.redirect('/'))
      .catch((err) => console.error(err))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '您已成功登出。')
  res.redirect('/users/login')
})

module.exports = router
