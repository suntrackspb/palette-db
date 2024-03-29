import $api from "../http/index.js";
import {getCookie} from "../utils/cookie.js";

class UserService {
  static getUserInfo = async (login) => {
    return $api.post('/user/info', {login}, {
      headers: {
        'X-CSRF-TOKEN': getCookie('csrf_access_token')
      }
    })
  }
  static setUserInfo = async (data) => {
    return $api.post('/user/update', data, {
      headers: {
        'X-CSRF-TOKEN': getCookie('csrf_access_token')
      }
    })
  }
  static sendFeedbackForm = async (data) => {
    return $api.post('/contact', data)
  }
  static changeAvatar = async (data) => {
    return $api.post('/user/avatar', data, {
      headers: {
        'X-CSRF-TOKEN': getCookie('csrf_access_token')
      }
    })
  }
}

export default UserService