import $api from "../http/index.js";
import {getCookie} from "../utils/cookie.js";

export default class AuthService {
  static login = async (login, password) => {
    return $api.post('/user/login', {login, password})
  }
  static registration = async (login, password) => {
    return $api.post('user/signup', {login, password})
  }

  static logout = async () => {
    return $api.post('/user/logout', {}, {
      headers: {
        'X-CSRF-TOKEN': getCookie('csrf_access_token')
      }
    })
  }
}
