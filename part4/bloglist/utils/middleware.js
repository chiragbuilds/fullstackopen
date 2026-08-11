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

module.exports = {errorHandler}
