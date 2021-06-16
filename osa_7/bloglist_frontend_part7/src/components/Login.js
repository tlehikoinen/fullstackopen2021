import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ login, setSignInVisible }) => {
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
      <Form onSubmit={onLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            id='username'
            type='text'
            name='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
          <Form.Label>password</Form.Label>
          <Form.Control
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <Button variant="primary" id="login-button" type="submit" >Login</Button>
          <Button variant="primary" id="show-signin" type="button" onClick={setSignInVisible}>Sign in</Button>
        </Form.Group>
      </Form>
    </div>
  )
}


export default LoginForm