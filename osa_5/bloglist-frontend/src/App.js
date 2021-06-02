import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateNewBlog from './components/CreateNewBlog'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [notificationMessage])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedInUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="errorNotification">
        {message}
      </div>
    )
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    return (
      <div className="notification">
        {message}
      </div>
    )
  }

  const loggedOutForm = () => {
    return (
      <Login 
      setUser={(user) => setUser(user)}
      setErrorMessage={(errorMessage) => setErrorMessage(errorMessage)}/>
    )
  }

  const loggedInForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <CreateNewBlog 
        setNotificationMessage = {(message) => {setNotificationMessage(message)}}
        setErrorMessage = {(message) => {setErrorMessage(message)}}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />)}
      </div>
    )
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    setNotificationMessage('Logged out successfully')
    setTimeout(() => {
      setNotificationMessage(null)
    }, 2000)
  }


  return (
    <div>
      <ErrorNotification message={errorMessage} />
      <Notification message={notificationMessage} />
      {user === null && loggedOutForm()}
      {user !== null && loggedInForm()}
    </div>
  )
}

export default App