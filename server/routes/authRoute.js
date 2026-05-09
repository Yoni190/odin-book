const { Router } = require('express')
const authController = require('../controllers/authController')
const validateRegister = require('../validators/validateRegister')


const router = Router()

router.post('/login', authController.localLogin)
router.post('/register', validateRegister, authController.register)


module.exports = router