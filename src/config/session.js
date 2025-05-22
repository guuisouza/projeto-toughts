const session = require('express-session')
const FileStore = require('session-file-store')(session)
const path = require('path')
const os = require('os')

module.exports = session({
  name: 'session',
  secret: 'nosso_secret',
  resave: false,
  saveUninitialized: false,
  store: new FileStore({
    logFn: function () {},
    path: path.join(os.tmpdir(), 'sessions')
  }),
  cookie: {
    secure: false,
    maxAge: 3600000,
    expires: new Date(Date.now() + 3600000),
    httpOnly: true
  }
})
