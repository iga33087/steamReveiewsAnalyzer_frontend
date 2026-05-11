import axios from 'axios'

const instance = axios.create();
instance.defaults.baseURL = "/api"

export default {
  async getInfo() {
    return instance.get(`/`).then(res=>res.data)
  },
  async getReport() {
    return instance.get(`/test`).then(res=>res.data)
  }
}