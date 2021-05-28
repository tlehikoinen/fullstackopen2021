const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')


const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
}


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
  .find({}).populate('user', {username:1, name:1})
    response.json(blogs.map(b => b.toJSON()))
})


blogsRouter.post('/', async (request, response, next) => {

  try {
    const body = request.body
    //const token = getTokenFrom(request)
    const token = request.token
    const decodedToken = jwt.verify(token, config.SECRET)

  if(!token || !decodedToken.id){
    return response.status(401).json({error: 'Token missing or invalid'}).end()
  }
  
    const user = await User.findById(decodedToken.id)


    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)

  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const message = await Blog.findByIdAndDelete(request.params.id)
    if (!message) {
      response.status(404).json({ Message: "Not found, couldn't delete" })
    }
    response.status(202).json({ Message: "Deleted Successfully" })
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  try {
    const message = await Blog.findByIdAndUpdate(request.params.id, body)
    if (!message) {
      response.status(404).json({ error: "not found" })
    } else {
      response.status(200).send("update successful")
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