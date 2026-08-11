const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async(req, res, next)=>{
    try{
        const users = await User.find({})
        res.status(200).json(users)
    } catch(error){
        next(error)
    }
})

usersRouter.post('/', async(req, res, next)=>{
    const {username, name, password} = req.body
    if(!(username && name && password)){
        return res.status(400).json({error: 'missing information'})
    }
    try{
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
    
        const user = new User({
            username,
            name,
            passwordHash
        })
    
        const savedUser = await user.save()
        res.status(201).json(savedUser)
    } catch(error){
        next(error)
    }
})

module.exports = usersRouter