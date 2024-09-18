const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/AuthController')

router.get('/login', AuthController.login) // manda a view de login
router.get('/register', AuthController.register) // manda a view de register
router.post('/register', AuthController.registerPost) // registra o usuário
router.get('/logout', AuthController.logout)// rota que simula a saida do sistema
module.exports = router