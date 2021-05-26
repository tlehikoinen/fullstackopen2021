const { TestScheduler } = require('@jest/core')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const initialBlogs = [
    {
        title : "React patterns",
        author : "Michael Chan",
        url : "https://reactpatterns.com/",
        likes : "7"
    },
    {
        title : "Go To Statement Considered Harmful",
        author : "Edsger W. Dijkstra",
        url : "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Consider...",
        likes : "5"
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

describe('Testing blogs', () => {

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
        const titles = response.body.map (b => b.title)
        expect(titles).toContain(
            'React patterns'
        )
    })
    
    test('adding new blog works', async () => {
        const newBlog = {
            title : "Newly added blog",
            author : "New author",
            url : "http://google.com",
            likes : "42"
        }
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const responseContent = response.body.map(r => r.title)
        expect(response.body).toHaveLength(initialBlogs.length + 1)
        expect(responseContent).toContain('Newly added blog')
    })

    test('blog added without likes gets default value of zero', async() => {
        const newBlogNoLikes = {
            title : "Newly added blog",
            author : "New author",
            url : "http://google.com",
        }

        await api
            .post('/api/blogs')
            .send(newBlogNoLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/blogs')
        expect(response.body[initialBlogs.length].likes).toEqual(0)
    })

    test('adding blog without title and url gets rejected with statuscode 400', async () => {
        const newBlogNoTitleUrl = {
            author : "New author"
        }

        await api
            .post('/api/blogs')
            .send(newBlogNoTitleUrl)
            .expect(400)
    })

})


afterAll(() => {
    mongoose.connection.close()
})