const express = require('express')
const router = express.Router()
const passport = require('passport')

const authController = {
  getFbLogin: async (req, res, next) => {
    try {
      return passport.authenticate('facebook', {
        scope: ['email', 'public_profile']
      })(req, res)
    } catch (error) {
      next(error)
    }
  },

  fbLoginCallback: async (req, res, next) => {
    try {
      return passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/users/login'
      })(req ,res)
    } catch (error) {
      next(error)
    }
  },

  getGoogleLogin: async (req, res, next) => {
    try {
      return passport.authenticate('google', {
        scope: ['email', 'profile']
      })(req, res)
    } catch (error) {
      next(error)
    }
  },

  googleLoginCallback: async (req, res, next) => {
    try {
      return passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/users/login'
      })(req, res)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = authController