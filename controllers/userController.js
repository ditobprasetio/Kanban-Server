const { User } = require('../models')
const { getToken } = require('../helper/jwt')
const { comparePassword } = require('../helper/bcrypt')

class UserController {
  static signup(req, res, next) {
    let { name, email, password } = req.body
    User.create({
      name,
      email,
      password
    })
      .then((user) => {
        let payload = {
          id: user.id,
          name: user.name,
          email: user.email
        }
        let token = getToken(payload)
        res.status(201).json({
          name: user.name,
          email: user.email,
          token
        })
      })
      .catch(next)
  }

  static signin(req, res, next) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        if (user) {
          let status = comparePassword(req.body.password, user.password)
          if (status) {
            let payload = {
              id: user.id,
              name: user.name,
              email: user.email
            }
            let token = getToken(payload)
            res.status(200).json({
              name: user.name,
              email: user.email,
              token
            })
          }
          else {
            next({ name: 'Invalid email or password' })
          }
        }
        else {
          next({ name: 'Invalid email or password' })
        }
      })
      .catch(next)
  }
}

module.exports = UserController