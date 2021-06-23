import { gql } from '@apollo/client'

export const GET_AUTHORS = gql `
query{
    allAuthors
      {
        name
        born
        bookCount
        id
      }
  }
`

export const GET_BOOKS = gql `
query{
    allBooks
      {
        title
        author{
          name
        }
        published
        id
      }
  }
`
export const GET_BOOKS_FILTER_GENRE = gql `
  query getBookGenre($genre: String!) {
    allBooks(genre: $genre){
      title
      author{
        name
        id
      }
      published
      id
    }
  }
`

export const ADD_BOOK = gql `
  mutation addNewBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
  ) {
    title
    author {
      name
      id
    }
    published
    genres
    }
  }
`

export const EDIT_AUTHOR = gql `
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
        name: $name
        setBornTo: $setBornTo
    ) {
        name
        born
        bookCount
      }
  }
`

export const LOGIN = gql `
  mutation login($username: String!, $password: String!) {
    login(
      username: $username
      password: $password
    ) {
      user{
        username
        favoriteGenre
      }
      token
      }
  }
`

export const GET_GENRES = gql `
  query {
    allGenres
  }
`

export const WHOAMI = gql `
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author{
        name
        id
      }
      published
      genres
      id
    }
  }
`

