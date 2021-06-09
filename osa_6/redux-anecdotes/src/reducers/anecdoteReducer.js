const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
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

export const addVote = (id) => {
  return {
    type: 'VOTE',
    id: id
  }
}

export const newAnecdote = (content) => {
  return {
    type: 'NEW',
    content: content
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export default anecdotesReducer