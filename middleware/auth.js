module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) return next()
    req.flash('warning_msg', '請先登入才能使用網頁功能！')
    res.redirect('/users/login')
  }
}
