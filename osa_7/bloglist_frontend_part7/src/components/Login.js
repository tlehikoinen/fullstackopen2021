import React, { useState } from 'react'

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = (event) => {
    event.preventDefault()
    const user = {
      username,
      password
    }
    login(user)
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={onLogin}>
        <div>
                    username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
                    password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button id="login-button" type="submit" >Submit</button>
      </form>
    </div>
  )
}


export default LoginForm