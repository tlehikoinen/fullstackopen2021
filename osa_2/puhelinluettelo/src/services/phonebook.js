import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newUser => {
    return axios.post(baseUrl, newUser)
}

const deleteUser = id => {
    return axios.delete(`${baseUrl}/${id}`)
}



export default {
    getAll,
    create,
    deleteUser
}
