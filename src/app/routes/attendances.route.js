const express = require('express')
const router = express.Router()
const attendanceController = require('../controllers/attendances.controller')

/* Middleware */
router.use(require('../middlewares/auth.middleware'))
router.use(require('../middlewares/logger.middleware'))

/* Route */
router.get('/', attendanceController.get)
router.get('/:nim', attendanceController.getId)
router.post('/')

module.exports = router