import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateNewBlog from './components/CreateNewBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { getBlogsFromServer, setNewBlog, addLikeToBlog, removeBlog } from './reducers/blogReducer'
import { clearUserInfo, setUserInfo } from './reducers/userReducer'

const App = () => {

  const [createNewVisible, toggleCreateNewVisible] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBlogsFromServer())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedInUser')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      stateSetUser(user)
      blogService.setToken(user.token)
    } else {
      dispatch(clearUserInfo())
    }
  }, [])

  const addLike = async (id, likes) => {
    try {
      await blogService.addLike(id, likes)
      dispatch(addLikeToBlog(id))
    } catch (error) {
      console.log(error)
    }
  }

  const createNewBlog = async (blog) => {
    try {
      const newBlog = await blogService.createNew( blog )
      setNotificationWithType(`${newBlog.title} by ${newBlog.author} was successfully added`, 'default', 3)
      dispatch(setNewBlog(newBlog))
      dispatch(getBlogsFromServer())
      toggleCreateNewVisible(!createNewVisible)
    } catch (exception) {
      setNotificationWithType(exception.response.data.error, 'error', 3)
    }
  }

  const deleteBlog = async (id) => {
    try {
      const response = await blogService.remove(id)
      setNotificationWithType(response.Message, 'default', 3)
      dispatch(removeBlog(id))
    } catch (error) {
      dispatch(getBlogsFromServer())
      setNotificationWithType('Was already deleted', 'error', 3)
    }

  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(clearUserInfo())
    setNotificationWithType('Logged out successfully', 'default', 1)
  }

  const setNotificationWithType = (message, type, time) => {
    dispatch(setNotification(message, type, time))
  }

  const stateSetUser = (user) => {
    dispatch(setUserInfo(user))
  }


  const Blogs = () => {
    const blogs = useSelector(state => state.blogs.blogs)
    const user = useSelector ( state => state.user.user)
    return (
      <div>
        <div className="blogs">
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} addLike={addLike} deleteBlog={deleteBlog} />)}
        </div>
      </div>
    )
  }

  const LoggedInForm = () => {
    const user = useSelector ( state => state.user.user)
    return (
      <div>
        <h2>Blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <CreateNewBlog
          createNewVisible = {createNewVisible}
          toggleCreateNewVisible = {() => toggleCreateNewVisible(!createNewVisible)}
          create={createNewBlog} />
        <Blogs />
      </div>
    )
  }

  const LoggedOutForm = () => {
    return (
      <Login
        setNotification={setNotificationWithType}
        setUserInfo={stateSetUser}/>
    )
  }

  return (
    <div>
      <Notification message={ useSelector(state => state.message)} type={ useSelector(state => state.type)} />
      { (useSelector(state => state.user.loggedIn)) === false && <LoggedOutForm />}
      { (useSelector(state => state.user.loggedIn)) === true && <LoggedInForm />}
    </div>
  )
}

export default App
