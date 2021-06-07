import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, setNotificationMessage, updateBlogTable, addLike }) => {

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
  const showWhenVisible = { display: viewBlog ? '' : 'none' }
  const hideWhenVisible = { display: viewBlog ? 'none' : '' }
  const showForOwner = { display: { user }.user.username === blog.user.username ? '' : 'none' }

  const toggleViewBlog = () => {
    setViewBlog(!viewBlog)
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

  const incrementLike = () => {
    addLike(blog.id, blog.likes)
  }

  return (
    <div className="blogDiv" style={blogStyle}>
      <div className="visibleDiv" style={hideWhenVisible} >
        {blog.title} {blog.author} <button type="button" style={buttonStyle} onClick={toggleViewBlog}>View</button>
      </div>
      <div className="hiddenDiv" style={showWhenVisible}>
        <h3>{blog.title}</h3>
        By author: {blog.author}<br/>
        Url: {blog.url}<br/>
        Likes: {blog.likes} <button type="button" style={buttonStyle} onClick={incrementLike}>Like</button> <br/>
        <button type="button" style={buttonStyle} onClick={toggleViewBlog}>Hide</button>
        <div style={showForOwner}>
          <button type="button" style={buttonStyle} onClick={removeBlog}>Remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  setNotificationMessage: PropTypes.func.isRequired,
  updateBlogTable: PropTypes.func.isRequired
}

export default Blog