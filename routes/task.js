const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/taskController')
const authorization = require('../middlewere/authorization')

router.post('/', TaskController.create)
router.get('/', TaskController.display)
router.get('/:id', TaskController.findById)
router.patch('/title/:id', authorization, TaskController.editTitle)
router.patch('/:id', authorization, TaskController.edit)
router.delete('/:id', authorization, TaskController.delete)

module.exports = router