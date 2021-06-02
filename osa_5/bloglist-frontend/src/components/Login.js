import React, { useState } from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = ({setUser, setErrorMessage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
          const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedInUser', JSON.stringify(user))
            blogService.setToken(user.token)
            setUsername('')
            setPassword('')
            setUser(user)
        } catch (exception) {
          setErrorMessage('Wrong credentials')
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
        }
      }

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


export default LoginForm