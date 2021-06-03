const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(b => b.toJSON()))
})


blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {

  try {
    const body = request.body
    const token = request.token
    const user = request.user

    if (!token || !user.id) {
      return response.status(401).json({ error: 'Token missing or invalid' }).end()
    }

    const userInDB = await User.findById(user.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: userInDB._id
    })

    const savedBlog = await blog.save()
    userInDB.blogs = userInDB.blogs.concat(savedBlog._id)
    await userInDB.save()
    response.status(201).json(savedBlog)

  } catch (error) {
    next(error)
  }
})


blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {

  try {
    const user = request.user
    const blogToBeDeleted = await Blog.findById(request.params.id)
    const allowDelete = user.id.toString() === blogToBeDeleted.user.toString()

    if (allowDelete === false) {
      return response.status(401).json({ error: 'false credentials' }).end()
    }

    const message = await Blog.findByIdAndDelete(request.params.id)
    if (!message) {
      response.status(404).json({ Message: "Not found, couldn't delete" })
    }
    response.status(202).json({ Message: "Deleted Successfully" })
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', middleware.userExtractor, async (request, response, next) => {

  try {
    const user = request.user
    const blogToBeUpdated = await Blog.findById(request.params.id)
    const allowUpdate = user.id.toString() === blogToBeUpdated.user.toString()

    console.log()

    if (request.body.likes === blogToBeUpdated.likes+1 && Object.keys(request.body).length === 1)  {
        await Blog.findByIdAndUpdate(request.params.id, request.body, { new : true })
        return response.status(201).json({message: 'Added like'}).end()
      }

    if (allowUpdate === false) {
      return response.status(401).json({ error: 'false credentials' }).end()
    }

    const body = request.body

    const message = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
    if (!message) {
      response.status(404).json({ error: "not found" })
    } else {
      response.status(200).json(message)
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter