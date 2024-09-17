const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

const connection = require('./db/connection')

// Models
const Tought = require('./models/Tought')
const User = require('./models/User')

// template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// receber resposta do body
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// session middleware -> diz ao express onde irá armazenar as sessões
app.use(
    session({
        name: "session",
        secret: "nosso_secret",
        resave: false,
        saveUninitialized: false,
        store: new FileStore({
            logFn: function() {},
            path: require('path').join(require('os').tmpdir(), 'sessions')
        }),
        cookie: {
            secure: false,
            maxAge: 3600000,
            expires: new Date(Date.now() + 3600000),
            httpOnly: true
        }
    })
)

// flash messages -> mensagens de status do sistema
app.use(flash())

// arquivos publicos
app.use(express.static('public'))

// set session to response 
app.use((req, res, next) => { 
    if (req.session.userid) { 
        // salva o userid na sessao criada acima
        // se ele tiver a sessao insere algo na session que garante que tenha o id desse usuário
        // em todas as requisições e resposta
        res.locals.session = req.session
    }

    next()
})

connection
    .sync()
    .then(() => {
        app.listen(3000)
    })
    .catch((err) => console.log(err))