import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)

    return response.data
}

const createNew = async content => {
    const newObject = { content, votes: 0 }
    const response = await axios.post(baseUrl, newObject)
    return response.data

}

const updateVotes = async anecdote => {
    const updatedObject = { ...anecdote, votes: anecdote.votes + 1 }
    const response = await axios.put(`${baseUrl}/${anecdote.id}`, updatedObject)
    return response.data
}

export default { getAll, createNew, updateVotes }