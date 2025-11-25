import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
})

// attach token before request
api.interceptors.request.use((config) => {
  try {
    const auth = useAuthStore()
    const token = auth.token
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
  } catch (err) {
    // store may not be initialized in some contexts; ignore
  }
  return config
}, (err) => Promise.reject(err))

export default api
