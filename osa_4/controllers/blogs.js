const blogsRouter = require('express').Router()
const Blog = require('../models/blog')



blogsRouter.get('/', (request, response) => {
  Blog.find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  const body = request.body
  if (body.title === undefined || body.url === undefined) {
    response.status(400).end()
  } else {
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
}

})

blogsRouter.delete('/:id', async (request, response, next) => {
  try{
  const message = await Blog.findByIdAndDelete(request.params.id)
  if (!message ){
    response.status(404).json({Message: "Not found, couldn't delete"})
  } 
   response.status(202).json({Message: "Deleted Successfully"})
  } catch(error){
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  try {
    const message = await Blog.findByIdAndUpdate(request.params.id, body)
      if(!message) {
        response.status(404).json({error:"not found"})
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