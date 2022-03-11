import React from 'react'
import axios from "axios";


const api = axios.create({
  baseURL: 'http://192.168.100.7:8080/api',
  timeout: 5000,
})

const Db = () => {
  return (
    <div>Api</div>
  )
}

export default Db
export { api }