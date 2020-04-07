const jwt = require('jsonwebtoken')

function getToken(payload) {
  return jwt.sign(payload, process.env.SECRET)
}

function verifyToken(token) {
  return jwt.verify(token, process.env.SECRET)
}

module.exports = {
  getToken,
  verifyToken
}