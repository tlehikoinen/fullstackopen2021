import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_GENRES, GET_BOOKS_FILTER_GENRE } from '../queries'

const Books = (props) => {
  const [filter, setFilter] = useState('all')
  const bookResult = useQuery(GET_BOOKS_FILTER_GENRE, {
    variables: { "genre": `${filter}` }
  })
  const genreResult = useQuery(GET_GENRES)
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
 

  useEffect(() => {
    if (bookResult.data && genreResult.data) {
      setBooks(bookResult.data.allBooks)
      setGenres(genreResult.data.allGenres)
    }
  }, [bookResult, genreResult])


  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
          {genres.map(g => 
            <td key={g}><button onClick={() => setFilter(g)}>{g}</button></td>)}
            <td><button onClick={() => setFilter('all')}>all</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Books