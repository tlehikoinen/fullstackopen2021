import anecdoteService from '../services/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote.content,
    id: anecdote.id,
    votes: 0
  }
}


const anecdotesReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': {
        const anecdoteToChange = state.find( ({id}) => id === action.id)
        const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes+1}
        return state.map(anecdote => anecdote.id !== action.id ? anecdote : changedAnecdote) 
      }
    case 'NEW':{
      return state.concat(asObject(action.content))
    }
    case 'INIT_ANECDOTES': {
      return action.data
    }
    default: 
      return state
  }
}

export const addVote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.addVote(anecdote)
    dispatch({
      type: 'VOTE',
      id: updatedAnecdote.id
    })
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW',
      content: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
  })
  }
}

export default anecdotesReducer