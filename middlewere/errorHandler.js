function errorHandler(err, req, res, next) {
  let status = 500
  let errName = {
    message: 'Internal Server Error'
  }
  if(err.name === 'SequelizeValidationError') {
    status = 400;
    let arrMessage = []
    for(let i=0; i<err.errors.length ; i++) {
      arrMessage.push(err.errors[i].message)
    }
    errName = {
      message: 'Bad Request',
      errors: arrMessage
    }
  }
  else if(err.name === 'NotFound') {
    status = 404;
    errName = {
      message: 'Item not found',
      errors: [err.name]
    }
  }
  else if(err.name === 'Invalid email or password') {
    status = 400;
    errName = {
      message: 'Invalid email or password',
      errors: [err.name]
    }
  }
  else if(err.name === 'Not authenticated') {
    status = 400;
    errName = {
      message: 'Not authenticated',
      errors: [err.name]
    }
  }
  else if(err.name === 'Unatuhorized') {
    status = 400;
    errName = {
      message: 'Unatuhorized',
      errors: [err.name]
    }
  }
  res.status(status).json(errName)
}

module.exports = errorHandler