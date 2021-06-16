import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const SignIn = ( { signin, signInVisible }) => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState ('')
  const display = { display: signInVisible ? 'block' : 'none' }

  const onSignin = (event) => {
    event.preventDefault()
    const user = {
      username, name, password
    }
    signin(user)
  }

  return (
    <div>
      <div style={display}>
        <h2>Create new account</h2>
        <Form onSubmit={onSignin}>
          <Form.Group>
            <Form.Label>username</Form.Label>
            <Form.Control
              id='SignInUsername'
              type='text'
              name='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
            <Form.Label>name</Form.Label>
            <Form.Control
              id='SignInName'
              type='text'
              name='name'
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
            <Form.Label>password</Form.Label>
            <Form.Control
              id='SignInPassword'
              type='password'
              name='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button variant="primary" id="signin-button" type="submit" >Submit</Button>
          </Form.Group>
        </Form>

      </div>
    </div>
  )
}


export default SignIn