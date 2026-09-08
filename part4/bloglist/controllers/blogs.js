const jwt = require('jsonwebtoken')
const blogsRouter = require("express").Router()
const Blog = require('../models/blog')
const User = require("../models/user")
const { userExtractor } = require('../utils/middleware')




blogsRouter.get("/", async(req, res)=>{
    try{
        const blogs = await Blog.find({}).populate('user')
        res.status(200).json(blogs)
    } catch (error) {
        console.error(error)
    }
    // Blog
    //   .find({})
    //   .then(response => res.status(200).json(response))
    //   .catch(error => console.error(error))
})

blogsRouter.post("/", userExtractor,async(req, res, next)=>{
    // const decodedToken = jwt.verify(req.token, process.env.SECRET)

    // if(!decodedToken.id){
    //     return res.status(401).json({error: 'token invalid'})
    // }
    

    // const users = await User.findById(decodedToken.id)
    // if(!users){
    //     return res.status(400).json({error: 'invalid userid'})
    // }

    const blog = new Blog({
        title: req.body.title,
        author: req.body.author,
        user: req.user._id,
        url: req.body.url,
        likes: req.body.likes
    })
    try{
        const response = await blog.save()
        req.user.blogs = req.user.blogs.concat(response._id)

        await req.user.save()
        res.status(201).json(response)
    } catch(error){
        next(error)
    }
    // blog.save()
    //     .then(response => res.status(201).json(response))
    //     .catch(error => console.error(error))
})



blogsRouter.delete('/:id', userExtractor,async (req, res, next) => {
    // const decodedToken = jwt.verify(req.token, process.env.SECRET)

    const blog = await Blog.findById(req.params.id)

    if(!blog){
        return res.status(404).json({ error: 'content not found' })
    }

    // if(!decodedToken.id || !(decodedToken.id===blog.user.toString())){
    //     return res.status(401).json({error: 'token invalid'})
    // }
    if(req.user._id.toString()!==blog.user.toString()){
        return res.status(401).json({error: 'token invalid'})
    }
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

blogsRouter.put('/:id', userExtractor,async (req, res, next) => {
    try {
        // const decodedToken = jwt.verify(req.token, process.env.SECRET)
        const id = req.params.id
        const blog = await Blog.findById(id)

        if(!blog){
            return res.status(404).json({ error: 'content not found' })
        }

        // if(!decodedToken.id || !(decodedToken.id===blog.user.toString())){
        //     return res.status(401).json({error: 'token invalid'})
        // }
        
        if(req.user._id.toString()!==blog.user.toString()){
            return res.status(401).json({error: 'token invalid'})
        }

        blog.title = req.body.title ?? blog.title
        blog.author = req.body.author ?? blog.author
        blog.url = req.body.url ?? blog.url
        blog.likes = req.body.likes ?? blog.likes

        await blog.save()

        res.status(200).json(blog)
        
    } catch (error) {
        next(error)
    }
})

module.exports = blogsRouter