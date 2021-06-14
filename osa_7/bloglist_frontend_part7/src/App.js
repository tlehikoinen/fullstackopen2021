import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import Blog from './components/Blog'
import CreateNewBlog from './components/CreateNewBlog'
import Login from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { getBlogsFromServer, setNewBlog, addLikeToBlog, removeBlog } from './reducers/blogReducer'
import { clearUserInfo, setUserInfo } from './reducers/userReducer'
import { getUsersAndBlogs } from './reducers/usersAndBlogsReducer'

const App = () => {

  const [createNewVisible, toggleCreateNewVisible] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBlogsFromServer())
    dispatch(getUsersAndBlogs())
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
      dispatch(getUsersAndBlogs())
      toggleCreateNewVisible(!createNewVisible)
    } catch (exception) {
      setNotificationWithType(exception.response.data.error, 'error', 3)
    }
  }

  const deleteBlog = async (id) => {

    try {
      const response = await blogService.remove(id)
      dispatch(removeBlog(id))
      dispatch(getUsersAndBlogs())
      setNotificationWithType(response.Message, 'default', 3)
    } catch (error) {
      dispatch(getBlogsFromServer())
      setNotificationWithType('Was already deleted', 'error', 3)
    }

  }

  const handleLogin = async (loginInfo) => {

    try {
      const user = await loginService.login(loginInfo)
      dispatch(setUserInfo(user))
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setNotificationWithType('Logged in successfully', 'default', 1)
    } catch (exception) {
      setNotificationWithType('Wrong credentials', 'error', 5)
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

  const Users = () => {
    const usersAndBlogs = useSelector(state => state.usersAndBlogs.data)
    return (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Blogs</th>
            </tr>
          </thead>
          <tbody>
            {usersAndBlogs.map(u =>
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.blogs.length}</td>
              </tr>)}
          </tbody>
        </table>
      </div>
    )
  }

  const LoggedInForm = () => {
    const user = useSelector(state => state.user.user)
    return (
      <div>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <Router>
          <Link to='/blogs'>blogs </Link>
          <Link to='/users'>users</Link>
          <Switch>
            <Route path='/blogs'>
              <h2>Blogs</h2>
              <div>
                <CreateNewBlog
                  createNewVisible={createNewVisible}
                  toggleCreateNewVisible={() => toggleCreateNewVisible(!createNewVisible)}
                  create={createNewBlog} />
                <Blogs />
              </div>
            </Route>
            <Route path='/users'>
              <Users />
            </Route>
            <Route path='/'>
              <h2>Blogs are great</h2>
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }

  const LoggedOutForm = () => {
    return (
      <div>
        <Login
          login={handleLogin}/>
      </div>
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
