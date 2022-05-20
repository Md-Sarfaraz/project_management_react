import axios from "axios";
import LocalStorage, { TOKEN_STORAGE_KEY } from "../utility/storage";
// import TokenService from "./token-service";

const baseURL = 'http://192.168.100.7:8090/api'

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'content-type': 'application/json',
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 5000,
})


api.interceptors.request.use(
  (config) => {
    const token = LocalStorage.getValue(TOKEN_STORAGE_KEY, {})
    if (token && token.accessToken)
      config.headers['Authorization'] = "Bearer " + token.accessToken

    return config;
  }, (error) => {
    // Do something with request error
    return Promise.reject(error);
  });

api.interceptors.response.use(
  (response) => {
    return response;
  }, async (error) => {
    const origConfig = error.config

    if (error.response) {
      if (error.response.status === 401 && !origConfig._retry) {
        origConfig._retry = true
        try {
          const token = LocalStorage.getValue(TOKEN_STORAGE_KEY, {})
          const response = await axios.get(baseURL + "/token/refresh", {
            headers: { "Authorization": "Bearer " + token.refreshToken }
          });
          const { accessToken } = response.data
          // TokenService.updateAccessToken(accessToken)

          return api(origConfig)
        } catch (error) {
          console.log('Error Response :: ', error);
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(error);
  });





export { api }