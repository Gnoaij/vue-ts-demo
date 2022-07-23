import Request from '@/utils/request'
import { BASE_URL, TIME_OUT } from './config'

import storage from '@/utils/storage'

const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

request.useRequestHooks(
  (config) => {
    const token = storage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.useResponseHooks(
  (res) => {
    return res.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
