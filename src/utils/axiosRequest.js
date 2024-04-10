import axios from 'axios'
import { useAuthStore } from '~/stores/authStore.js'

const axiosRequest = axios.create()

axiosRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // config.withCredentials = true
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosRequest.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 403) {
      const authStore = useAuthStore()
      authStore.logout()
    }
    return Promise.reject(error)
  }
)

export default axiosRequest
