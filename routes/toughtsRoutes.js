const express = require('express')
const router = express.Router()
const ToughtController = require('../controllers/ToughtController')

//helpers 

const checkAuth = require('../helpers/auth') // sempre que precisar proteger uma rota

router.get('/dashboard', checkAuth, ToughtController.dashboard)
router.get('/', ToughtController.showToughts)

module.exports = router