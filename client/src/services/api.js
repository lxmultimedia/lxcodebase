import axios from 'axios'
import store from '@/store/store'

export default () => {
  const instance = axios.create({
    baseURL: 'https://lxcodeserver.herokuapp.com/',
    // baseURL: 'http://localhost:8081/',
    headers: {'Authorization': 'Bearer ' + store.getters.getToken}
  })

  instance.interceptors.response.use((response) => {
    return response
  }, (error) => {
    if (error.response.status === 403) {
      // Token Expiration check
      const tokenExp = store.getters.getTokenExpires
      if (tokenExp) {
        if (tokenExp - Date.now() <= 0) {
          store.dispatch('setToken', null)
        }
      }
      return Promise.reject(error.message)
    }
    return Promise.reject(error.message)
  })

  return instance
}
