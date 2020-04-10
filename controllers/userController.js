const { User } = require('../models')
const { getToken } = require('../helper/jwt')
const { comparePassword } = require('../helper/bcrypt')
const { OAuth2Client } = require('google-auth-library');

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

  static googleSignin(req, res, next) {
    let obj = {}
    const token = req.headers.token
    const client = new OAuth2Client(process.env.CLIENT_ID);
    client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })
      .then((ticket) => {
        let payload = ticket.getPayload()
        obj.email = payload.email
        return User.findOne({
          where: {
            email: obj.email
          }
        })
      })
      .then((user) => {
        if (!user) {
          let arr = []
          let email = obj.email
          arr = email.split('@')
          let name = arr[0]
          return User.create({
            name,
            email,
            password: process.env.DEFAULTPASSWORD
          })
        }
        else {
          return user
        }
      })
      .then((user) => {
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
      })
      .catch(next)
  }
}

module.exports = UserController