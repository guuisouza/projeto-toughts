const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')

router.get('/login', AuthController.login) // manda a view de login
router.get('/register', AuthController.register) // manda a view de register
router.post('/register', AuthController.registerPost) // registra o usuário

module.exports = router