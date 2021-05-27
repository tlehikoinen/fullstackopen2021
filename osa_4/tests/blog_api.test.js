const { TestScheduler } = require('@jest/core')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { update } = require('../models/blog')
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



describe('Testing blogs', () => {

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

    test('deleting blog', async () => {
        const response = await api.get('/api/blogs')
        const blogToDelete = response.body[0]
        console.log("to be deleted", blogToDelete)
        const deleteAddress = `/api/blogs/${blogToDelete.id}`
        await api
            .delete(deleteAddress)
            .expect(202)
    

        const newResponse = await api.get('/api/blogs')
        expect(newResponse.body).toHaveLength(initialBlogs.length - 1 )
        expect(newResponse.body).not.toContain(blogToDelete)
    })

    test('updating blog', async () => {
        const initialBlogs = await api.get('/api/blogs')
        const blogToUpdate = initialBlogs.body[0]
        const updatedBlog = {
            title: "updatedTitle",
            likes: "666"
        }
        const updateAddress = `/api/blogs/${blogToUpdate.id}`
        await api
        .put(updateAddress)
        .send(updatedBlog)
        .expect(200)

        const afterUpdateBlogs = await api.get('/api/blogs')
        expect(afterUpdateBlogs.body[0]).not.toEqual(blogToUpdate)
        expect(afterUpdateBlogs.body[0].title).toEqual(updatedBlog.title)
    
    })
    
})


afterAll(() => {
    mongoose.connection.close()
})