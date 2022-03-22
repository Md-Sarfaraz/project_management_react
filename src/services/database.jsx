import axios from "axios";


const api = axios.create({
  baseURL: 'http://192.168.100.7:8090/api',
  headers:{
    'content-type': 'text/json'
  },
  timeout: 5000,
})


export { api }