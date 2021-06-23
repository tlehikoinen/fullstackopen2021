import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommended from './components/RecommendedBooks'
import { useApolloClient, useSubscription } from '@apollo/client'
import { BOOK_ADDED, GET_AUTHORS, GET_BOOKS_FILTER_GENRE, GET_GENRES } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [favoriteGenre, setFavoriteGenre] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {

    const includedIn = (set, id) => {
      let exists = false;
      for (var i = 0; i < set.length; i++) {
        if (set[i].id === id) {
          exists = true;
          break;
        }
      }
      return exists
    }

    const booksInStore = client.readQuery({
      query: GET_BOOKS_FILTER_GENRE,
      variables: { "genre": "all" },
    })
    const authorsInStore = client.readQuery({ query: GET_AUTHORS }) 

    if (!includedIn(booksInStore.allBooks, addedBook.id)) {
      client.writeQuery({
        query: GET_BOOKS_FILTER_GENRE,
        variables: { "genre": "all" },
        data: { allBooks: booksInStore.allBooks.concat(addedBook) }
      })
    }
    
    if(!(includedIn(authorsInStore.allAuthors, addedBook.author.id))) {
      client.writeQuery({
        query: GET_AUTHORS,
        data: {allAuthors: authorsInStore.allAuthors.concat({...addedBook.author, bookCount: 1})}
      }) 
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`new book ${addedBook.title} added by ${addedBook.author.name}`)
      updateCacheWith(addedBook)
    }
  })

  const logout = () => {
    setToken(null)
    setPage('authors')
    localStorage.clear()
    client.resetStore()
  }
  
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td><button onClick={() => setPage('authors')}>authors</button></td>
            <td><button onClick={() => setPage('books')}>books</button></td>
            <td>
              <button 
                style={{ display: token ? 'block' : 'none' }} 
                onClick={() => setPage('recommended')}>
                recommended</button>
            </td>
            <td>
              <button
                style={{ display: token ? 'none' : 'block' }}
                onClick={() => setPage('login')}>
                login</button>
            </td>
            <td>
              <button 
                style={{ display: token ? 'block' : 'none' }} 
                onClick={() => setPage('add')}>
                add book
              </button>
            </td>
            <td>
              <button 
                style={{ display: token ? 'block' : 'none' }}
                onClick={logout}>
                Logout
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <Authors
        show={page === 'authors'} 
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />
      
      <Login
        show={page === 'login'}
        setToken={setToken}
        setFavoriteGenre={setFavoriteGenre}
        setPage={setPage}
      />
      
      <Recommended 
      show={page === 'recommended'}
      favoriteGenre={favoriteGenre}
      />
    </div>
  )
}

export default App