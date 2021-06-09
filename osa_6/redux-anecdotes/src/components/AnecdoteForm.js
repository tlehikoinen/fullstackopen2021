import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const createAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(newAnecdote(anecdote))
    dispatch(setNotification(`Anecdote added: ${anecdote}`, 5))
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