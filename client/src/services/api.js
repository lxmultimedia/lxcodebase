import axios from 'axios'

export default () => {
  return axios.create({
    // baseURL: 'https://lxcodeserver.herokuapp.com/'
    baseURL: 'http://localhost:8081/'
  })
}
