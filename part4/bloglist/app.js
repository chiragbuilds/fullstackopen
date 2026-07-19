const express = require('express')
const blogsRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const config = require("./utils/config")
const middleware = require('./utils/middleware')

const app = express()

mongoose
    .connect(config.MONGODB_URI, { family: 4 })
    .then(()=>console.log("Connected to mondodb"))
    .catch(error => console.error("Failed to connect to mongodb : ", error))

app.use(express.json())

app.use('/api/blogs', blogsRouter)

app.use(middleware.errorHandler)

module.exports = app