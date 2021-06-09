import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const newAnecdote = {
        content: content,
        id: (100000 * Math.random()).toFixed(0),
        votes: 0
    }
    const response = await axios.post(baseUrl, newAnecdote)
    return response.data
}

const addVote = async (content) => {
    const response = await axios.put(`${baseUrl}/${content.id}`, {...content, votes:content.votes+1})
    return response.data
}

export default { getAll, createNew, addVote }