const express = require('express')
const router = express.Router()
const ToughtController = require('../controllers/ToughtController')

const authMiddleware = require('../middlewares/authMiddleware')

router.get('/add', authMiddleware, ToughtController.createTought)
router.post('/add', authMiddleware, ToughtController.createToughtSave)
router.get('/edit/:id', authMiddleware, ToughtController.updateTought)
router.post('/edit', authMiddleware, ToughtController.updateToughtPost) 
router.post('/remove', authMiddleware, ToughtController.removeTought)
router.get('/dashboard', authMiddleware, ToughtController.dashboard)
router.get('/', ToughtController.showToughts)
module.exports = router