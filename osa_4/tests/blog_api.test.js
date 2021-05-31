const { TestScheduler } = require('@jest/core')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { update } = require('../models/blog')
const api = supertest(app)
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')


const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: "7"
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Consider...",
        likes: "5"
    }
]

const michaelchan = {
    username: "michaelchan",
    user: "Michael Chan",
    password: "michaelchan"
}

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
})

describe('Testing blogs', () => {

    describe('Making initial user and testing login', () => {

        test('Make sure userlist has only michael chan(as a test user)', async () => {
            await User.deleteMany({})
            await api.post('/api/users').send(michaelchan)

            const users = await api
                .get('/api/users')
                .expect(200)

            expect(users.body).toHaveLength(1)
            expect(users.body[0].username).toEqual(michaelchan.username)
        })

        test('Make sure that login works with initial user', async () => {
            const loginInfo = {
                username: michaelchan.username,
                password: michaelchan.password
            }
            await api.post('/api/login').send(loginInfo)
                .expect(200)
        })

        test('Make sure that login fails with false credentials', async () => {
            const falseLoginInfo = {
                username: michaelchan.username,
                password: "falsePassword"
            }
            await api.post('/api/login').send(falseLoginInfo)
                .expect(401)
        })

    })

    describe('Testing initial blogs', () => {

        beforeEach(async () => {
            await Blog.deleteMany({})
            await Blog.insertMany(initialBlogs)
        })

        test('blogs are returned as json', async () => {
            await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-type', /application\/json/)
        })

        test('id field is returned without underscore', async () => {
            const res = await api.get('/api/blogs')
            expect(res.body[0].id).toBeDefined()
        })

        test('there are 2 blogs', async () => {
            const response = await api.get('/api/blogs')
            expect(response.body).toHaveLength(initialBlogs.length)
        })

        test('first blog in the list is "React patterns" ', async () => {
            const response = await api.get('/api/blogs')
            const titles = response.body.map(b => b.title)
            expect(titles).toContain(
                'React patterns'
            )
        })
    })

    describe('Testing login required blog functions', () => {

        beforeAll(async () => {
            await Blog.deleteMany({})
            await Blog.insertMany(initialBlogs)
        })

        const testUserToken = async () => {
            const loginInfo = {
                username: michaelchan.username,
                password: michaelchan.password
            }

            const response = await api.post('/api/login').send(loginInfo)
                .expect(200)

            return response.body.token
        }

        test('adding new blog works', async () => {
            const newBlog = {
                title: "Newly added blog",
                author: "Michael Chan",
                url: "http://new-michael-chan-blog.com",
                likes: "45"
            }
            const token = await testUserToken()

            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(newBlog)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const response = await api.get('/api/blogs')
            const responseContent = response.body.map(r => r.title)
            expect(response.body).toHaveLength(initialBlogs.length + 1)
            expect(responseContent).toContain('Newly added blog')
        })

        test('blog added without likes gets 0 as likes', async () => {
            const newBlogNoLikes = {
                title: "Blog without likes has 0",
                author: "Michael Chan",
                url: "http://google.com",
            }
            const token = await testUserToken()

            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(newBlogNoLikes)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const response = await api.get('/api/blogs')
            expect(response.body[response.body.length - 1].title).toContain('Blog without likes has 0')
            expect(response.body[response.body.length - 1].likes).toEqual(0)
        })

        test('adding blog without title and url gets rejected with statuscode 400', async () => {
            const newBlogNoTitleUrl = {
                author: "Michael Chan"
            }

            const token = await testUserToken()

            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${token}`)
                .send(newBlogNoTitleUrl)
                .expect(400)
        })

        test('Updating blog fails with false token', async () => {
            const response = await api.get('/api/blogs')
            const blogToUpdate = response.body[response.body.length - 1]
            const token = 'jklasdhiashjdkahjksd'

            const updatedBlog = {
                likes: blogToUpdate.likes + 1
            }
            await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updatedBlog)
                .expect(401)
        })

        test('Updating succeeds with correct token', async () => {

            const token = await testUserToken()

            const response = await api.get('/api/blogs')
            const blogToUpdate = response.body[response.body.length-1]
            console.log("just checking", blogToUpdate)
            const updatedBlog = {
                likes: blogToUpdate.likes + 1
            }

            const updatedBlogResponse = await api
                .put(`/api/blogs/${blogToUpdate.id}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updatedBlog)

                expect(200)
                expect(updatedBlogResponse.body.likes).toEqual = blogToUpdate.likes + 1
        })

        test('deleting blog', async () => {
            const response = await api.get('/api/blogs')
            const blogToDelete = response.body[response.body.length - 1]
            const token = await testUserToken()

            const deleteAddress = `/api/blogs/${blogToDelete.id}`
            await api
                .delete(deleteAddress)
                .set('Authorization', `Bearer ${token}`)
                .expect(202)

            const newResponse = await api.get('/api/blogs')
            expect(newResponse.body).toHaveLength(response.body.length - 1)
            expect(newResponse.body).not.toContain(blogToDelete)
        })
    })

    afterAll(() => {
        mongoose.connection.close()
    })

})