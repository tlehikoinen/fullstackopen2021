import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote, newAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state.sort((a,b) => (b.votes - a.votes)))
  const dispatch = useDispatch()

  const vote = (id) => {
    return(
      dispatch(addVote(id))
    )
  }

  const createAnecdote = (event) => {
    event.preventDefault()
    return(
      dispatch(newAnecdote(event.target.anecdote.value))
    )
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name="anecdote" placeholder="Whats up?" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App