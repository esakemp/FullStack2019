import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async updatedObject => {
  const response = await axios.put(
    `${baseUrl}/${updatedObject.id}`,
    updatedObject
  )

  return response
}

const comment = async object => {
  const response = await axios.post(`${baseUrl}/${object.id}/comments`, object)

  return response.data
}

const remove = async removedObject => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.delete(`${baseUrl}/${removedObject.id}`, config)

  return response
}

export default { getAll, setToken, create, update, remove, comment }
