const express = require('express')
const router = express.Router()
const ToughtController = require('../controllers/ToughtController')

//helpers 

const checkAuth = require('../helpers/auth') // sempre que precisar proteger uma rota

router.get('/add', checkAuth, ToughtController.createTought) // manda a view de add tought
router.get('/dashboard', checkAuth, ToughtController.dashboard)
router.get('/', ToughtController.showToughts)

module.exports = router