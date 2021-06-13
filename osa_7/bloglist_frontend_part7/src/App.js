import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import CreateNewBlog from './components/CreateNewBlog'
import Login from './components/Login'
import TestNotification from './components/Notification'
import blogService from './services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { printBlogs, getBlogsFromServer, setNewBlog, addLikeToBlog, removeBlog } from './reducers/blogReducer'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [createNewVisible, toggleCreateNewVisible] = useState(false)
  const dispatch = useDispatch()

  // const blogser = async () => {
  //   const blogs = await blogService.getAll()
  //   dispatch(setBlogss(blogs))
  // }



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => a.likes < b.likes ? 1 : -1))
    )
    dispatch(getBlogsFromServer())
  }, [dispatch])



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
      dispatch(addLikeToBlog(id))
    } catch (error) {
      console.log(error)
    }
    updateBlogTable()
  }



  const deleteBlog = async (id) => {
    try {
      const response = await blogService.remove(id)
      updateBlogTable()
      setNotifications(response.Message, 'default', 3)
      dispatch(removeBlog(id))
    } catch (error) {
      updateBlogTable()
      setNotification('Was already deleted', 'error', 3)
    }

  }

  const createNewBlog = async (blog) => {
    try {
      const newBlog = await blogService.createNew( blog )
      updateBlogTable()
      setNotifications(`${newBlog.title} by ${newBlog.author} was successfully added`, 'default', 3)
      dispatch(setNewBlog(newBlog))
      toggleCreateNewVisible(!createNewVisible)
    } catch (exception) {
      setNotifications(exception.response.data.error, 'error', 3)
    }
  }

  const LoggedOutForm = () => {
    return (
      <Login
        setUser={setUser}
        setNotification={setNotifications}/>
    )
  }
  const logBlogState = () => {
    dispatch(printBlogs())
  }

  const BlogState = ( { logBlogState, getBlogsFromServer }) => {
    const newBlogsTest = useSelector(state => state.blogs.blogs)

    return (
      <div>
        <button type="button" onClick={logBlogState}>print</button>
        <button type="button" onClick={() => dispatch(getBlogsFromServer())}>getblogs</button>
        <button type="button" onClick={() => dispatch(setNewBlog( { author:'ok', title:'ok', url:'ok', id:'213123', user: { username:'ok' } }))}> asd</button>
        <button type="button" onClick={() => dispatch(addLikeToBlog('60afae04d532693868dd80a4'))}>like</button>
        <button type="button" onClick={() => dispatch(removeBlog('60afae04d532693868dd80a4'))}>remove</button>
        <div className="blogs">
          {newBlogsTest.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} addLike={addLike} deleteBlog={deleteBlog} />)}
        </div>

      </div>
    )
  }


  const LoggedInForm = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
        <CreateNewBlog
          createNewVisible = {createNewVisible}
          toggleCreateNewVisible = {() => toggleCreateNewVisible(!createNewVisible)}
          setNotification={setNotifications}
          create={createNewBlog}
          updateBlogTable = {updateBlogTable} />
        <div className="blogs">
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} user={user} addLike = {addLike} deleteBlog={deleteBlog} updateBlogTable={updateBlogTable} setNotification={setNotifications} />)}
        </div>
        <div>
          <BlogState logBlogState={logBlogState} getBlogsFromServer={getBlogsFromServer} />

        </div>
      </div>
    )
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
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
