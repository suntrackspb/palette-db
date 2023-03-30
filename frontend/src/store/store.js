import {makeAutoObservable} from "mobx";
import AuthService from "../api/AuthService.js";
import {cryptoPass} from "../utils/crypto.js";
import UserService from "../api/UserService.js";
import {vocabulary} from "../vocabulary/vocabulary";

export default class Store {
  user = {}
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

  login = async (login, password) => {
    try {
      const res = await AuthService.login(login, cryptoPass(password))
      console.log(res)

      localStorage.setItem('login', login)
      this.setAuth(true)
      this.setUser({login})
      this.setErrorMessage('')
    }
    catch (e) {
      console.log(e?.response?.data)
      this.setErrorMessage(vocabulary[e?.response?.data?.code] || e.response?.data?.text)
    }
  }
  registration = async (login, password) => {
    try {
      const res = await AuthService.registration(login, cryptoPass(password))
      console.log(res)

      this.setSuccess(true)
      this.setSuccessMessage(vocabulary.registrationSuccess)
      this.setErrorMessage('')
    }
    catch (e) {
      console.log(e?.response?.data)
      this.setErrorMessage(vocabulary[e?.response?.data?.code] || e.response?.data?.text)
      this.setSuccessMessage('')
    }
  }
  logout = async () => {
    try {
      const res = await AuthService.logout()
      localStorage.removeItem('login')
      this.setAuth(false)
      this.setUser({})
    }
    catch (e) {
      console.log(e?.response?.data)
    }
  }


  checkAuth = async () => {
    try {
      const res = await UserService.getUserInfo()
      localStorage.setItem('login', res.data.login)
      console.log(res)

      this.setAuth(true)
      this.setUser(res.data)
      this.setFavorite(res.data.favorite)
    }
    catch (e) {
      console.log(e?.response?.data)
    }
  }

  updateUser = async (data) => {
    try {
      const res = await UserService.setUserInfo(data)
      this.setUser(res.data)
      this.setSuccessMessage(vocabulary.editProfileSuccess)
      this.setErrorMessage('')
    }
    catch (e) {
      this.setErrorMessage(vocabulary[e?.response?.data?.code] || e.response?.data?.text)
      this.setSuccessMessage('')
    }
  }

}