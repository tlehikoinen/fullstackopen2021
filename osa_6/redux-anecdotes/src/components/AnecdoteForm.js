import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const createAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    return(
      dispatch(newAnecdote(anecdote))
    )
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name="anecdote" placeholder="Whats up?" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm