const {test, beforeEach, after, describe} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const app = require('../app')
const User = require('../models/user')

const api = supertest(app)
const url = '/api/users'

const dummy = {
    username:'dummy',
    name:'ussop',
    password:'ussop123'
}

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'admin', name:'luffy', passwordHash })
    await user.save()
  })

  test.only('creation succeeds with a fresh username', async () => {
    const usersAtStart = await User.find({})

    await api
      .post(url)
      .send(dummy)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await User.find({})
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    assert(usernames.includes(dummy.username))
  })

  test.only('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await User.find({})

    const result = await api
      .post(url)
      .send({username:'admin', name:"luffy", password:'password'})
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('username must be unique'))

    const usersAtEnd = await User.find({})
    assert.deepStrictEqual(usersAtStart,usersAtEnd)
  })

  test.only('creation fails with proper statuscode and message if there is no username', async () => {
    const usersAtStart = await User.find({})

    const result = await api
      .post(url)
      .send({name:'luffy', password:'password'})
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('missing information'))

    const usersAtEnd = await User.find({})
    assert.deepStrictEqual(usersAtStart,usersAtEnd)
  })

  test.only('creation fails with proper statuscode and message if there is no password', async () => {
    const usersAtStart = await User.find({})

    const result = await api
      .post(url)
      .send({username:'luffy', name:'hellow'})
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('missing information'))

    const usersAtEnd = await User.find({})
    assert.deepStrictEqual(usersAtEnd, usersAtStart)
  })

  test.only('creation fails with proper statuscode and message if username is too short', async () => {
    const usersAtStart = await User.find({})

    const result = await api
      .post(url)
      .send({username:'k', name:'a', password:'asdsaadas'})
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('username must be at least 3 character long'))

    const usersAtEnd = await User.find({})
    assert.deepStrictEqual(usersAtEnd, usersAtStart)
  })

  test.only('creation fails with proper statuscode and message if password is too short', async () => {
    const usersAtStart = await User.find({})

    const result = await api
      .post(url)
      .send({username:'ksas', name:'a', password:'a'})
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('password must be at least 3 character long'))

    const usersAtEnd = await User.find({})
    assert.deepStrictEqual(usersAtEnd, usersAtStart)
  })

  after(async ()=>{
    await mongoose.connection.close()
  })

})