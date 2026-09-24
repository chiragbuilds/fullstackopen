const User = require("../models/user");
const jwt = require('jsonwebtoken')

const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  else if (error.name === 'CastError') {
    return response.status(404).json({ error: error.message })
  }
  else if (error.name === 'TypeError') {
    return response.status(400).json({ error: error.message })
  }
  else if (error.name === 'MongoServerError') {
    return response.status(400).json({error:'username must be unique'})
  }
  console.error(error.name, error.message)
  next(error)
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')){
    req.token = authorization.replace('Bearer ', '')
  }
  else{
    req.token = null
  }
  next()
}

const userExtractor = async(req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if(!decodedToken.id){
    return res.status(401).json({error: 'token invalid'})
  }
  const user = await User.findById(decodedToken.id)

  if (!user) {
  return res.status(401).json({ error: 'user not found' })
}
  req.user = user
  next()
}

module.exports = {errorHandler, tokenExtractor, userExtractor}
