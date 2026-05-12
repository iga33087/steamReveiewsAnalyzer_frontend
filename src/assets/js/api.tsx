import axios from 'axios'

const instance = axios.create();
instance.defaults.baseURL = "/api"

export default {
  async genReport(x) {
    return instance.get(`/genReport`,{params:x}).then(res=>res.data)
  },
  async getReport(x) {
    return instance.get(`/getReport`,{params:x}).then(res=>res.data)
  }
}