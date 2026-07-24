const blogsRouter = require("express").Router()
const Blog = require('../models/blog')


blogsRouter.get("/", async(req, res)=>{
    try{
        const blogs = await Blog.find({})
        res.status(200).json(blogs)
    } catch (error) {
        console.error(error)
    }
    // Blog
    //   .find({})
    //   .then(response => res.status(200).json(response))
    //   .catch(error => console.error(error))
})

blogsRouter.post("/", async(req, res, next)=>{
    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        url: req.body.url,
        likes: req.body.likes
    })
    try{
        const response = await blog.save()
        res.status(201).json(response)
    } catch(error){
        next(error)
    }
    // blog.save()
    //     .then(response => res.status(201).json(response))
    //     .catch(error => console.error(error))
})



blogsRouter.delete('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id)
        if(!deletedBlog){
            return res.status(404).json({error: 'content not found'})
        }
        res.status(200).json(deletedBlog)
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter