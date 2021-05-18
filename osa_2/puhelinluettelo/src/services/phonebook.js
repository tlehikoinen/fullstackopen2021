import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newUser => {
    return axios.post(baseUrl, newUser)
}

const deleteUser = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const updateUserPhonenumber = (newUserInfo) => {
    return axios.put(`${baseUrl}/${newUserInfo.id}`, newUserInfo)
}



export default {
    getAll,
    create,
    deleteUser,
    updateUserPhonenumber
}
