import {makeAutoObservable} from "mobx";
import AuthService from "../api/AuthService.js";
import {cryptoPass} from "../utils/crypto.js";
import UserService from "../api/UserService.js";
import {vocabulary} from "../vocabulary/vocabulary";

export default class Store {
  user = {}
  userColor = ''
  favorite = []
  isAuth = false
  errorMessage = ''
  successMessage = ''
  success = false

  constructor() {
    makeAutoObservable(this)
  }

  setAuth = bool => {
    this.isAuth = bool
  }
  setUser = user => {
    this.user = user
  }
  setErrorMessage = message => {
    this.errorMessage = message
  }
  setSuccessMessage = message => {
    this.successMessage = message
  }
  setSuccess = bool => {
    this.success = bool
  }
  setFavorite = arr => {
    this.favorite = arr
  }
  setUserColor = color => {
    this.userColor = color
  }
  setAvatar = (avatar = '') => {
    this.user = {...this.user, avatar}
  }

  login = async (login, password) => {
    try {
      const res = await AuthService.login(login, cryptoPass(password))

      this.setAuth(true)
      this.setUser({login})
      this.setErrorMessage('')
    } catch (e) {
      this.setErrorMessage(vocabulary[e?.response?.data?.code] || e.response?.data?.text)
    }
  }
  registration = async (login, username, password) => {
    try {
      const res = await AuthService.registration(login, username, cryptoPass(password))

      this.setSuccess(true)
      this.setSuccessMessage(vocabulary.registrationSuccess)
      this.setErrorMessage('')
    } catch (e) {
      this.setErrorMessage(vocabulary[e?.response?.data?.code] || e.response?.data?.text)
      this.setSuccessMessage('')
    }
  }
  logout = async () => {
    try {
      const res = await AuthService.logout()
      this.setAuth(false)
      this.setUser({})
    } catch (e) {
      // console.log(e?.response?.data)
    }
  }


  checkAuth = async () => {
    try {
      const res = await UserService.getUserInfo(this.user.login)
      if (res) {
        this.setAuth(true)
        this.setUser(res.data)
        this.setFavorite(res.data.favorite)
      } else {
        this.setAuth(false)
      }
    } catch (e) {
      // console.log(e?.response?.data?.msg)
    }
  }

  updateUser = async (data) => {
    try {
      const res = await UserService.setUserInfo(data)
      this.setUser(res.data)
      this.setSuccessMessage(vocabulary.editProfileSuccess)
      this.setErrorMessage('')
    } catch (e) {
      this.setErrorMessage(vocabulary[e?.response?.data?.code] || e.response?.data?.text)
      this.setSuccessMessage('')
    }
  }

  updateAvatar = async (avatar) => {
    try {
      const res = await UserService.changeAvatar({avatar})
      this.setAvatar(avatar === 'None' ? '' : avatar)
      this.setSuccessMessage(vocabulary[res?.data?.code])
      this.setErrorMessage('')
    } catch (e) {
      this.setErrorMessage(vocabulary[e?.response?.data?.code] || e.response?.data?.text)
      this.setSuccessMessage('')
    }
  }

}