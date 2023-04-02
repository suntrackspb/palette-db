import axios from "axios";
import {deleteCookie} from "../utils/cookie";
import {API_URL, X_API_KEY} from "../consts/index.js";

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
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