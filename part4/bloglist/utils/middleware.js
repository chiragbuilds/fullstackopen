const errorHandler = (error, request, response, next) => {
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  if (error.name === 'CastError') {
    return response.status(404).json({ error: error.message })
  }
  console.error(error.name, error.message)
  next(error)
};

module.exports = {errorHandler}
