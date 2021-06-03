import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNew = async (newBlog) => {
  const config = {headers : { Authorization : token}}
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const addLike = async (blogId, likes) => {
  
  const config = {headers : { Authorization : token}}
  const response = await axios.put(`${baseUrl}/${blogId}`, {"likes": likes+1}, config)
  return response.data
} 

export default {addLike, getAll, createNew, setToken }