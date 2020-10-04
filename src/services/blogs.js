import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const request = await axios.get(baseUrl)
    console.log(request.data)
    return request.data.sort((a, b) => b.likes - a.likes)
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const increaseLikes = async (updatedBlog) => {
    const config = {
        headers: { Authorization: token },
    }
    console.log(updatedBlog)

    const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
    console.log(response.data)
    return response.data
}

const addComment = async (updatedBlog) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
    console.log(response)
    return response.data
}

const deletePost = async (id) => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}

export default { getAll, setToken, create, increaseLikes, deletePost, addComment }