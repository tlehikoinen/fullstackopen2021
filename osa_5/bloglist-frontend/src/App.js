import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateNewBlog from './components/CreateNewBlog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [createNewVisible, toggleCreateNewVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => a.likes < b.likes ? 1 : -1))
    )
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedInUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const updateBlogTable = () => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => a.likes < b.likes ? 1 : -1))
    )
  }


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

  const addLike = async (id, likes) => {
    try {
      await blogService.addLike(id, likes)
    } catch (error) {
      console.log(error)
    }
    updateBlogTable()
  }

  const handleLogin = async (user) => {
    event.preventDefault()
    try {
      const loggedInUser = await loginService.login({ username: user.username, password: user.password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
      blogService.setToken(loggedInUser.token)
      setUser(loggedInUser)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  const createNewBlog = async blog => {
    try {
      const newBlog = await blogService.createNew(blog)
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

  const LoggedOutForm = () => {
    return (
      <Login
        setUser={setUser}
        setErrorMessage={setErrorMessage}
        handleLogin={handleLogin}/>
    )
  }

  const LoggedInForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <CreateNewBlog
          createNewVisible = {createNewVisible}
          toggleCreateNewVisible = {() => toggleCreateNewVisible(!createNewVisible)}
          createNewBlog = {createNewBlog}/>
        <div className="blogs">
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} addLike = {addLike} updateBlogTable={updateBlogTable} setNotificationMessage = {(message) => {setNotificationMessage(message)}} />)}
        </div>
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
      {user === null && <LoggedOutForm />}
      {user !== null && <LoggedInForm />}
    </div>
  )
}

export default App