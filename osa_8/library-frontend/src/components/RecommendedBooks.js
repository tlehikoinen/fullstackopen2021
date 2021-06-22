import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'
import { GET_BOOKS_FILTER_GENRE } from '../queries'

const Recommended = (props) => {

  const [favoriteBooks, setFavoriteBooks] = useState([])

  const result = useQuery(GET_BOOKS_FILTER_GENRE, {
    variables: { "genre": `${props.favoriteGenre}` }
  })

  useEffect(() => {
    if (result.data) {
      setFavoriteBooks(result.data.allBooks)
    }
  },[result])
  

  if (!props.show){
    return null
}

    return (
        <div>
        <h2>Recommended</h2>
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
          {favoriteBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
        </div>
    )
}


export default Recommended