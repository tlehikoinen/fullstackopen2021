import React, {useState} from 'react'
const Blog = ({blog}) => {

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
    borderWidth:'1px'
  }

  const [viewBlog, setViewBlog] = useState(false)
  const showWhenVisible = {display: viewBlog ? '' : 'none'}
  const hideWhenVisible = {display: viewBlog ? 'none' : ''}

  const toggleViewBlog = () => {
    setViewBlog(!viewBlog)
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
        Likes: {blog.likes} 
        <button type="button" style={buttonStyle} onClick={toggleViewBlog}>Hide</button>
      </div>
    </div>
  )
}

export default Blog