import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'

const CreateNewBlog = ({ create, createNewVisible, toggleCreateNewVisible }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const hideWhenVisible = { display: createNewVisible ? 'none' : '' }
  const showWhenVisible = { display: createNewVisible ? '' : 'none' }

  const createNew = async event => {
    event.preventDefault()
    const blog = {
      title,
      author,
      url
    }
    create(blog)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="primary" type="button" onClick={toggleCreateNewVisible}>Create new</Button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={createNew}>
          <h2>Create New</h2>
          <div>
                        title:
            <input
              id="newBlogTitle"
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}></input>
          </div>
          <div>
                        author:
            <input
              id="newBlogAuthor"
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}></input>
          </div>
          <div>
                        url:
            <input
              id="newBlogUrl"
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}></input>
          </div>
          <Button variant="success"id="submitNewBlog-button" type="submit">Create</Button>
          <Button variant="danger" id="cancelNewBlog-button" type="button" onClick={toggleCreateNewVisible}>Cancel</Button>
        </form>
      </div>
    </div>
  )



}
export default CreateNewBlog