import axios from 'axios'

const baseUrl = 'https://p3-phonebook-backend.herokuapp.com/api/persons'

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
