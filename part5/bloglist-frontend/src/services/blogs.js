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

const create = async newObj => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObj, config)
  return response.data
}

const updateBlog = async newData => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${newData.id}`, newData, config)
  return response.data
}

const deleteBlog = async blog => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

export default { getAll, setToken, create, updateBlog, deleteBlog }