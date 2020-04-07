const { verifyToken } = require('../helper/jwt')
const { User } = require('../models')

function authentication(req, res, next) {
  try{
    if(req.headers.token) {
      let decoded = verifyToken(req.headers.token)
      req.currentUserId = decoded.id
      User.findByPk(
        Number(req.currentUserId)
      )
        .then((user) => {
          if(user) {
            next()
          }
          else {
            next({ name: 'Not authenticated' })
          }
        })
        .catch(next)
    }
    else {
      next({ name: 'Not authenticated' })
    }
  }
  catch{
    next({ name: 'Not authenticated' })
  }
}

module.exports = authentication