import React, {useState} from 'react'
import blogService from '../services/blogs'
const Blog = ({blog, user, setNotificationMessage, updateBlogTable}) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonStyle = {
    background:'none',
    borderRadius:'5px',
    borderWidth:'1px',
  }


  const [viewBlog, setViewBlog] = useState(false)
  const showWhenVisible = {display: viewBlog ? '' : 'none'}
  const hideWhenVisible = {display: viewBlog ? 'none' : ''}
  const showForOwner = {display: {user}.user.username === blog.user.username ? '' : 'none'}

  const toggleViewBlog = () => {
    setViewBlog(!viewBlog)
  }
  
  const addLike = async () => {
    try {
      await blogService.addLike(blog.id, blog.likes)
      updateBlogTable()
    } catch (error) {
      console.log(error)
    }
  }

  const removeBlog = async () => {

    if(window.confirm('you sure')){
      const response = await blogService.remove(blog.id) 
      if (response.error === undefined){
        updateBlogTable()
        setNotificationMessage(response.Message)
      }
      setTimeout(() => {
        setNotificationMessage(null)
      }, 1000)
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} >
        {blog.title} {blog.author} <button type="button" style={buttonStyle} onClick={toggleViewBlog}>View</button>
      </div>  
      <div style={showWhenVisible}>
        <h3>{blog.title}</h3>
        By author: {blog.author}<br/>
        Url: {blog.url}<br/>
        Likes: {blog.likes} <button type="button" style={buttonStyle} onClick={addLike}>Like</button> <br/>
        <button type="button" style={buttonStyle} onClick={toggleViewBlog}>Hide</button>
      <div style={showForOwner}>
        <button type="button" style={buttonStyle} onClick={removeBlog}>Remove</button>
      </div>
      </div>
    </div>
  )
}

export default Blog