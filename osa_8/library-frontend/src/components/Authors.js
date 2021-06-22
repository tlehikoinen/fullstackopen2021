import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { EDIT_AUTHOR, GET_AUTHORS } from '../queries'

const Authors = (props) => {
  const [authors, setAuthors] = useState([])
  const [name, setName] = useState('')
  const [setBornTo, setBornYear] = useState('')
  const result  = useQuery(GET_AUTHORS)

  useEffect(() => {
    if (result.data){
      setAuthors(result.data.allAuthors)
    }
  }, [result])

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: GET_AUTHORS } ]
  })

  const submit = (event) => {
    event.preventDefault()
    editAuthor( { variables : { name, setBornTo } })

    setName('')
    setBornYear('')

  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={{ display: props.token ? 'block' : 'none' }} > 
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <div>
            <select value={name} onChange={(event) => setName(event.target.value)}>
              <option>Select name</option>
              {authors.map(a => 
                <option key={a.name} value={a.name}>{a.name}</option>)}
            </select>
          </div>
          <div>
            born <input type="number" value={setBornTo} onChange={({ target }) => setBornYear(parseInt(target.value))}/>
          </div>
          <button type="submit">update author</button>

        </form>
      </div>

    </div>
  )
}

export default Authors