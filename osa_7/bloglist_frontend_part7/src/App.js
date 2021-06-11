import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateNewBlog from './components/CreateNewBlog'
import Login from './components/Login'
import TestNotification from './components/Notification'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [createNewVisible, toggleCreateNewVisible] = useState(false)
  const dispatch = useDispatch()


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

  const setNotifications = (message, type, timeout) => {
    dispatch(setNotification(message, type, timeout))
  }

  const addLike = async (id, likes) => {
    try {
      await blogService.addLike(id, likes)
    } catch (error) {
      console.log(error)
    }
    updateBlogTable()
  }


  const LoggedOutForm = () => {
    return (
      <Login
        setUser={setUser}
        setNotification={setNotifications}/>
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
          setNotification={setNotifications}
          updateBlogTable = {updateBlogTable} />
        <div className="blogs">
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} addLike = {addLike} updateBlogTable={updateBlogTable} setNotification={setNotifications} />)}
        </div>
      </div>
    )
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    setNotifications('Logged out successfully', 'default', 1)

  }


  return (
    <div>
      <TestNotification message={ useSelector(state => state.message)} type={ useSelector(state => state.type)}/>
      {user === null && <LoggedOutForm />}
      {user !== null && <LoggedInForm />}
    </div>
  )
}

export default App