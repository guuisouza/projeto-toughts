const express = require('express')
const exphbs = require('express-handlebars')
const flash = require('express-flash')
const path = require('path')

const session = require('./config/session')
const sessionMiddleware = require('./middlewares/sessionMiddleware')
const routes = require('./routes')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(session)
app.use(flash())
app.use(express.static('src/public'))
app.use(sessionMiddleware)

app.use('/', routes)

module.exports = app
