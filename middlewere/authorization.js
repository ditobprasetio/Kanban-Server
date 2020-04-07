const { Task } = require('../models')

function authorization(req, res, next) {
  Task.findOne({
    where: {
      id: req.params.id,
      UserId: req.currentUserId
    }
  })
  .then((task) => {
    if(task) {
      next()
    }
    else{
      res.status(401).json({ name:'Unatuhorized' })
    }
  })
  .catch((err) => {
    res.status(401).json({ name:'Unatuhorized' })
  })
}

module.exports = authorization