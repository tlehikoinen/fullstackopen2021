const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const bcrypt = require('bcrypt')
const User = require('../models/user')

describe('Testing user collection', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        
        const passwordHash = await bcrypt.hash('password', 10)
        const newUser = new User({username : "testUserName", name: "testUserRealName", passwordHash})
        await newUser.save()
    })


    test('Database has one user', async () => {
        const getUsersRes = await api.get('/api/users')
        expect(getUsersRes.body).toHaveLength(1)
    })

    test('Creation succeeds with unique username', async () => {
        const newUser = {username : "testUserName2", name: "testUserRealName2", password: "salasana"}
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        })

    test('Creating fails with username collision', async () => {
        const existingUsers = await api.get('/api/users')
        const existingUsername = existingUsers.body[0].username
        const newUser = {username: existingUsername, name: "testName", password: "salasana"}        
        
        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')
    })

    test('Creating fails without username', async () => {
        const newUser = {username: "", name: "testName",  password: "asdasd"}

        const results = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(results.body.error).toContain('`username` is required')
    })

    test('Creating fails without password', async () => {
        const newUser = {username: "username", name: "testName",  password: ""}

        const results = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(results.body.error).toContain('error with password')
    })

    afterAll(() => {
        mongoose.connection.close()
      }) 
    
})