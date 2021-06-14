import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, addLike, deleteBlog }) => {

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

  const remove = () => {
    if(window.confirm('you sure')){
      deleteBlog(blog.id)
    }
  }

  const incrementLike = () => {
    addLike(blog.id, blog.likes)
  }

  return (
    <div className="blogDiv" style={blogStyle}>
      <div className="visibleDiv" style={hideWhenVisible}>
        {blog.title} {blog.author} <button type="button" style={buttonStyle} onClick={toggleViewBlog}>View</button>
      </div>
      <div className="hiddenDiv" style={showWhenVisible}>
        <h3>{blog.title}</h3>
        By author: {blog.author}<br/>
        Url: {blog.url}<br/>
        Likes: {blog.likes} <button type="button" id="like-button" style={buttonStyle} onClick={incrementLike}>Like</button> <br/>
        <button type="button" style={buttonStyle} onClick={toggleViewBlog}>Hide</button>
        <div style={showForOwner}>
          <button type="button" style={buttonStyle} onClick={remove}>Remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  user: PropTypes.object.isRequired,
  blog: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired
}

export default Blog