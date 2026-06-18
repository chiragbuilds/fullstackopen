const blogsRouter = require("express").Router()
const Blog = require('../models/blog')


blogsRouter.get("/", (req, res)=>{
    Blog
      .find({})
      .then(response => res.status(200).json(response))
      .catch(error => console.error(error))
})

blogsRouter.post("/", (req, res)=>{
    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes
    })

    blog.save()
        .then(response => res.status(200).json(response))
        .catch(error => console.error(error))
})

module.exports = blogsRouter