import axios from 'axios'
import store from '@/store/store'

export default () => {
  const instance = axios.create({
    baseURL: 'https://lxcodebaseserver.oa.r.appspot.com',
    // baseURL: 'http://localhost:8081/',
    headers: { Authorization: 'Bearer ' + store.getters.getToken }
  })

  instance.interceptors.response.use(
    response => {
      tokenCheck()
      return response
    },
    error => {
      if (error.response.status === 403) {
        tokenCheck()
        return Promise.reject(error.message)
      }
      return Promise.reject(error.message)
    }
  )

  function tokenCheck () {
    const tokenExp = store.getters.getTokenExpires
    if (tokenExp) {
      if (tokenExp - Date.now() <= 0) {
        store.dispatch('setToken', null)
      }
    }
  }

  return instance
}
