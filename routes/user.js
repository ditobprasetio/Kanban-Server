const express = require('express')
const router = express.Router()
const UserController = require('../controllers/userController')

router.post('/signup', UserController)
router.post('/signin', UserController)

module.exports = router