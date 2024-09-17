const express = require('express')
const router = express.Router()

//controller
const ToughtController = require('../controllers/ToughtController')

router.get('/', ToughtController.showToughts)

module.exports = router