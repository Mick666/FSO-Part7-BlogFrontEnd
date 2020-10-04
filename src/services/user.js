import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const request = await axios.get(baseUrl)
    console.log(request.data)
    return request.data
}

export default { getAll, setToken }