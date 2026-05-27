
require('dotenv').config()

const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const URI = process.env.MONGODB_URI

mongoose.connect(URI, {family:4})
    .then(result => console.log('Connected to ', URI))
    .catch(error => console.log('Error occured while connecting! ',error))

const ContactSchema = new mongoose.Schema({
  name : String,
  number : String,
})

module.exports = mongoose.model('Contact', ContactSchema)
