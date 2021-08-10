import axios from 'axios'

const api = axios.create({
    baseURL:process.env.API_URL || 'http://localhost:4000'
})

export default api