import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams

} from 'react-router-dom'
import Blog from './components/Blog'
import CreateNewBlog from './components/CreateNewBlog'
import Login from './components/Login'
import SignIn from './components/SignIn'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { addCommentToBlog, getBlogsFromServer, setNewBlog, addLikeToBlog, removeBlog } from './reducers/blogReducer'
import { clearUserInfo, setUserInfo } from './reducers/userReducer'
import { getUsersAndBlogs } from './reducers/usersAndBlogsReducer'
import { Button, Table, Navbar, Nav } from 'react-bootstrap'


const App = () => {

  const [createNewVisible, toggleCreateNewVisible] = useState(false)
  const [signInVisible, setSignInVisible] = useState(false)
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

  const handleSignin = async (signinInfo) => {
    try {
      await userService.createNew(signinInfo)
      setSignInVisible(!signInVisible)
      dispatch(getUsersAndBlogs())
    } catch (error) {
      console.log(error)
      setNotificationWithType(error.message, 'error', 2)
    }
  }

  const addNewComment = async (blogId, comment, addNewComment) => {
    try{
      const response = await blogService.addComment(blogId, comment)
      const updatedBlog = response.message.comments[response.message.comments.length-1]
      dispatch(addCommentToBlog(blogId, comment = { id : updatedBlog._id, comment: updatedBlog.comment } ))
      addNewComment('')
    } catch (error) {
      console.log(error)
    }

  }

  const setNotificationWithType = (message, type, time) => {
    dispatch(setNotification(message, type, time))
  }

  const stateSetUser = (user) => {
    dispatch(setUserInfo(user))
  }

  const padding = {
    padding: '10px'
  }

  const Blogs = () => {
    const blogs = useSelector(state => state.blogs.blogs)
    const user = useSelector ( state => state.user.user)
    return (
      <div>
        <h2>Blogs</h2>
        <div className="blogs">
          <Table striped>
            <tbody>
              {blogs.map(blog =>
                <tr key={blog.id}><Blog key={blog.id} blog={blog} user={user} addLike={addLike} deleteBlog={deleteBlog} /></tr>)}
            </tbody>
          </Table>
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
                <td><Link to={`/users/${u.id}`}>{u.name}</Link> </td>
                <td>{u.blogs.length}</td>
              </tr>)}
          </tbody>
        </table>
      </div>
    )
  }

  const UserWithBlogs = () => {
    const usersAndBlogs = useSelector(state => state.usersAndBlogs)
    const id = useParams().id
    const userWithBlogs = usersAndBlogs.data.find(d => d.id === id)

    if (!userWithBlogs) {
      return null
    }
    return (
      <div>
        <h2>{userWithBlogs.name}</h2>
        <h3>Added blogs</h3>
        <ul>
          {userWithBlogs.blogs.map(b =>
            <li key={b.id}><Link to={`/blogs/${b.id}`}>{b.title}</Link></li>
          )}
        </ul>
      </div>
    )
  }

  const IndividualBlog = () => {
    const blogId = useParams().id
    const blogs = useSelector(state => state.blogs.blogs)
    const loggedInUser = useSelector(state => state.user.user.name)
    const individualBlog = blogs.find(b => b.id === blogId)

    const [newComment, setNewComment] = useState('')

    if(!individualBlog || !loggedInUser) {
      return null
    }
    const comments = individualBlog.comments.length !==0 ? individualBlog.comments : undefined
    const showForOwner = { display:  loggedInUser === individualBlog.user.name ? '' : 'none' }

    return (
      <div>
        <div>
          <h2>{individualBlog.title} by {individualBlog.author}</h2>
          <p><a href={individualBlog.url}>{individualBlog.url}</a></p>
          <div>
            {individualBlog.likes} likes
            <button type="button" onClick={() => addLike(individualBlog.id, individualBlog.likes)}> like</button>
            <button style={showForOwner} type="remove" onClick={() => { if (window.confirm('you sure')) { { deleteBlog(individualBlog.id) } } }}>Delete</button>
          </div>
          <p>Added by {individualBlog.user.name}</p>
        </div>
        <div>
          <h2>Comments</h2>
          <input value={newComment} onChange={({ target }) => setNewComment(target.value)} /><button type="button" onClick={() => addNewComment(individualBlog.id, newComment, setNewComment)}>Add comment</button>
          {comments !== undefined
            ?
            <div>
              <ul>
                {comments.map(c =>
                  <li key={c._id}>{c.comment}</li>)}
              </ul>
            </div>
            : <h2>No comments yet</h2>}
        </div>

      </div>
    )
  }

  const NavigationBar = () => {
    const user = useSelector(state => state.user.user)

    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/blogs">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user.name} logged in <Button variant="danger" onClick={handleLogout}>logout</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )


  }

  const LoggedInForm = () => {
    return (
      <div>
        <Router>
          <NavigationBar/>
          <h2>Blog app</h2>
          <Switch>
            <Route path='/blogs/:id'>
              <IndividualBlog />
            </Route>
            <Route path='/blogs'>
              <div>
                <CreateNewBlog
                  createNewVisible={createNewVisible}
                  toggleCreateNewVisible={() => toggleCreateNewVisible(!createNewVisible)}
                  create={createNewBlog} />
                <Blogs />
              </div>
            </Route>
            <Route path='/users/:id'>
              <UserWithBlogs />
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
          login={handleLogin} setSignInVisible={() => setSignInVisible(!signInVisible)} />
        <SignIn signin={handleSignin} signInVisible={signInVisible}/>
      </div>
    )
  }

  return (
    <div className='container'>
      <Notification message={ useSelector(state => state.message)} type={ useSelector(state => state.type)} />
      { (useSelector(state => state.user.loggedIn)) === false && <LoggedOutForm />}
      { (useSelector(state => state.user.loggedIn)) === true && <LoggedInForm />}
    </div>
  )
}

export default App
