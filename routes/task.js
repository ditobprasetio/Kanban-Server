const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/taskController')

router.post('/', TaskController)
router.get('/', TaskController)
router.patch('/:id', TaskController)
router.delete('/:id', TaskController)

module.exports = router