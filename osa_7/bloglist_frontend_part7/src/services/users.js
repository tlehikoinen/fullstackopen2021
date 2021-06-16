import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = async (user) => {
  const response = await axios.post(baseUrl, { username: user.username, name: user.name, password: user.password } )
  return response

}



export default { createNew, getAll }