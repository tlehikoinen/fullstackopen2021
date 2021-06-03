import React, { useState } from 'react'
import blogService from '../services/blogs'

const CreateNewBlog = ({ setNotificationMessage, setErrorMessage, createNewVisible, toggleCreateNewVisible, updateBlogTable }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const hideWhenVisible = { display: createNewVisible ? 'none' : '' }
  const showWhenVisible = { display: createNewVisible ? '' : 'none' }

  const createNewBlog = async event => {
    event.preventDefault()
    try {
      const newBlog = await blogService.createNew({ title, author , url })
      updateBlogTable()
      setNotificationMessage(`${newBlog.title} by ${newBlog.author} was successfully added`)
      toggleCreateNewVisible()
    } catch (exception) {
      setErrorMessage(exception.response.data.error)
    }
    setTimeout(() => {
      setNotificationMessage(null)
      setErrorMessage(null)
    },2000)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button type="button" onClick={toggleCreateNewVisible}>Create new</button>
      </div>
      <div style={showWhenVisible}>
        <form onSubmit={createNewBlog}>
          <h2>Create New</h2>
          <div>
                        title:
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}></input>
          </div>
          <div>
                        author:
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}></input>
          </div>
          <div>
                        url:
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}></input>
          </div>
          <button type="submit">Create</button>
          <button type="button" onClick={toggleCreateNewVisible}>Cancel</button>
        </form>
      </div>
    </div>
  )



}
export default CreateNewBlog