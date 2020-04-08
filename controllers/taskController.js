const { Task, User } = require('../models/')

class TaskController {
  static create(req, res, next) {
    Task.create({
      title: req.body.title,
      UserId: req.currentUserId
    })
      .then((task) => {
        res.status(201).json({ task })
      })
      .catch(next)
  }

  static display(req, res, next) {
    Task.findAll({
      where: {
        UserId: req.currentUserId
      },
      include: [{
        model: User,
        attributes: {
          exclude: ['password']
        }
      }]
    })
      .then((task) => {
        res.status(200).json(task)
      })
      .catch(next)
  }

  static edit(req, res, next) {
    Task.update({
      category: req.body.category
    }, {
      where: {
        id: req.params.id
      },
      returning: true
    })
      .then((result) => {
        if (!result[1]) {
          res.status(404).json({ name: 'NotFound' })
        }
        else {
          res.status(200).json(result[1][0])
        }
      })
      .catch(next)
  }

  static delete(req, res, next) {
    let id = req.params.id
    let deletedTask;
    Task.findByPk(id)
      .then((task) => {
        if (task) {
          deletedTask = task
          return Task.destroy({
            where: {
              id: id
            }
          })
        }
        else {
          next({ name: 'NotFound' })
        }
      })
      .then(result => {
        if (result) {
          res.status(200).json({
            message: 'Delete success',
            deletedTask
          })
        }
        else {
          next({ name: 'NotFound' })
        }
      })
      .catch(next)
  }
}

module.exports = TaskController