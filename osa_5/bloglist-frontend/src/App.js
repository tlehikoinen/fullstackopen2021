import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const ErrorNotification = ({ message }) => {
    return (
      <div>
        <h1 style={{ color: "red" }}>{message}</h1>
      </div>
    )
  }

  const Notification = ({ message }) => {
    return (
      <div>
        <h1 style={{ color: "green" }}>{message}</h1>
      </div>
    )
  }

  const loggedOutForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          <h2>Log in to application</h2>
        username
                <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password
                <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    )
  }

  const loggedInForm = () => {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />)}
      </div>
    )
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedInUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
    }

  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
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