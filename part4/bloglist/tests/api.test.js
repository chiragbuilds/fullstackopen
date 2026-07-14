const {test, beforeEach, after, describe} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
const { initialBlogs } = require('../utils/list_helper')
const { log } = require('node:console')
const { default: mongoose } = require('mongoose')



const api = supertest(app)


beforeEach(async ()=>{
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
    console.log('DB cleanup success!')
})

describe('reading the blogs',() => {
    test('blogs are returned as json', async() => {
        await api.get('/api/blogs')
                 .expect(200)
                 .expect('Content-Type', /application\/json/)
    })
    test('all blogs are returned',async() => {
        const response = await api.get('/api/blogs')
        const data = response.body
        assert.strictEqual(data.length,initialBlogs.length)
    })
    test('return blogs with right unique identifier property', async() => {
        const response = await api.get('/api/blogs')
        const data = response.body
        data.forEach(blog => {
            assert.ok(blog.id)
            assert.strictEqual(blog._id, undefined)
        });
    })
})

after(async ()=>{
    await mongoose.connection.close()
})