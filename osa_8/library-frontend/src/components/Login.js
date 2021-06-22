import React, {useEffect, useState} from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
      onError: (error) => {
          console.log(error)
      }
  })

  useEffect(() => {
      if (result.data) {
        const token = result.data.login.value
        props.setToken(token)
        props.setPage('authors')
        localStorage.setItem('library-user-token', token)
      }
  }, [result.data])


  const submit = async (event) => {
      event.preventDefault()
      login( { variables: { username, password }})
      setUsername('')
      setPassword('')


  }

  if (!props.show) {
      return null
  }

  return (
    <div>
      <h2>login</h2>
        <form onSubmit={submit}>
          <div>
            username
            <input 
              value={username}
              type="text"
              onChange={({ target }) => setUsername(target.value)}
              />     
          </div>  
          <div>
            password
            <input 
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
             
            />
          </div>
          <button type="submit">Login</button>

        </form>
    </div>
  )
}


export default Login