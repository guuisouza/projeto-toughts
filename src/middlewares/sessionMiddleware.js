module.exports = (req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session
  }
  next()
}
