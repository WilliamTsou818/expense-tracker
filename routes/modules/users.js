const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, comfirmPassword } = req.body
  if (password !== comfirmPassword) {
    return res.render('register', {
      name,
      email,
      password
    })
  }
  User.findOne({ email }).then((user) => {
    if (user) return res.render('register', { name, email })
    User.create({
      name,
      email,
      password
    })
      .then(() => res.redirect('/'))
      .catch((err) => console.error(err))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/users/login')
})

module.exports = router
