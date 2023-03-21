import axios from "axios";
import {deleteCookie} from "../utils/cookie";
import {cryptoKey} from "../utils/crypto.js";

export const API_URL = 'https://api.sntrk.ru/api'
export const LOCAL_API_URL = 'http://dev.local:5001/api'
export const X_API_KEY = cryptoKey()

const $api = axios.create({
  withCredentials: true,
  baseURL: LOCAL_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': X_API_KEY
  }
})

$api.interceptors.response.use(config => {
  return config
}, async (error) => {
  if (error.response.status === 401 && error.response?.data?.msg === "Token has expired") {
    localStorage.removeItem('login')
    deleteCookie('csrf_access_token')
  }
  else {
    throw error
  }
})

export default $api