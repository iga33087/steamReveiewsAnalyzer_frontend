import axios from 'axios'
import { toast } from 'react-toastify'
import store from '../../store/index'; 
import { loadingChange } from '../../store/globalSlice'

const instance = axios.create();
instance.defaults.baseURL = "/api"

instance.interceptors.request.use((config)=> {
  //config.headers.Authorization = localStorage.token;
  return config;
}, function (error) {
  return Promise.reject(error);
});

instance.interceptors.response.use((response)=> {
  if(response.data?.status<0) {
    throw response
  }
  return response;
}, function (error) {
  console.log(error?.response)
  toast.error(JSON.stringify(error?.response?.data))
  store.dispatch(loadingChange(false))
  return Promise.reject(error);
});

export default {
  async genReport(x:any) {
    return instance.get(`/genReport`,{params:x}).then(res=>res.data)
  },
  async getReport(x:any) {
    return instance.post(`/report`,x).then(res=>res.data)
  },
  async getReportOne(x:any) {
    return instance.get(`/report/${x}`).then(res=>res.data)
  },
  async markupReport(x:any) {
    return instance.put(`/report/markup/${x}`).then(res=>res.data)
  },
  async delReportOne(x:any) {
    return instance.delete(`/report/${x}`).then(res=>res.data)
  },
  async getModel() {
    return instance.get(`/model`).then(res=>res.data)
  },
}