import axios from 'axios'

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

export default axiosRequest
