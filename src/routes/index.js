const express = require('express')
const router = express.Router()

const toughtsRoutes = require('./toughtsRoutes')
const authRoutes = require('./authRoutes')
const ThoughtController = require('../controllers/ToughtController')

router.get('/', ThoughtController.showToughts)

router.use('/toughts', toughtsRoutes)
router.use('/', authRoutes)

module.exports = router
