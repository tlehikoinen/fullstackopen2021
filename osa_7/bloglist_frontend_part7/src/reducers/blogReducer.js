import blogService from '../services/blogs'

const blogReducer = (state = { blogs: [] }, action) => {
  switch(action.type){
  case 'SETBLOGS':
    state.blogs = action.blogs.sort((a,b) => a.likes < b.likes ? 1 : -1)
    return state

  case 'NEWBLOG': {
    const newBlogs = state.blogs.concat(action.blog)
    state.blogs = newBlogs
    return state
  }
  case 'ADDLIKE':
    state.blogs = state.blogs.map(s => s.id === action.id ? { ...s, likes: s.likes+1 } : s)
    return state

  case 'REMOVEBLOG':
    state.blogs = state.blogs.filter(s => s.id !== action.id)
    return state

  case 'PRINT':
    console.log(state.blogs)
    return state

  default:
    return state

  }

}

export const getBlogsFromServer = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogss(blogs))
  }
}


export const setBlogss = (blogs) => {
  return {
    type: 'SETBLOGS',
    blogs: blogs
  }
}

export const setNewBlog = (blog) => {
  return {
    type: 'NEWBLOG',
    blog: blog
  }
}

export const removeBlog = (id) => {
  return {
    type: 'REMOVEBLOG',
    id: id
  }
}

export const addLikeToBlog = (id) => {
  return {
    type: 'ADDLIKE',
    id: id
  }
}

export const printBlogs = () => {
  return {
    type: 'PRINT'
  }
}

export default blogReducer