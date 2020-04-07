const express = require('express')
const router = express.Router()
const UserRouter = require('./user')
const TaskRouter = require('./task')
const authentication = require('../middlewere/authentication')

router.use('/', UserRouter)
router.use(authentication)
router.use('/task', TaskRouter)

module.exports = router