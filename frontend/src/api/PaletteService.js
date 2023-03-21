import axios from "axios";
import $api, {API_URL, LOCAL_API_URL, X_API_KEY} from "../http/index.js";
import {getCookie} from "../utils/cookie.js";

export class PaletteService {
  static getPalettes = async (skip, count) => {
    const body = {skip, count}
    const res = await $api.post('/palettes/list', body)
    return res.data
  }

  static getPaletteById = async (id) => {
    const body = {id}
    const res = await $api.post('/palettes/id', body)
    return res.data[0]
  }

  static getPaletteByCategory = async (category, skip, count) => {
    const body = {
      tags: [category], skip, count
    }
    const res = await $api.post('/palettes/colors', body)
    return res.data
  }

  static getTags = async () => {
    const res = await $api.post('/palettes/tags', {})
    return res.data
  }

  static getFavorites = async (login) => {
    const res = await $api.post('/palettes/favorite', {login}, {
      headers: {
        'X-CSRF-TOKEN': getCookie('csrf_access_token')
      }
    })
    return res.data
  }

  static createPalette = async (data) => {
    const res = await axios.post(`${LOCAL_API_URL}/palettes/create`, data, {
      headers: {
        'X-CSRF-TOKEN': getCookie('csrf_access_token'),
        'x-api-key': X_API_KEY,
      }
    })
    return res.data
  }


  static savePalette = async (data) => {
    const res = await $api.post('/palettes/save', data, {
      headers: {
        'X-CSRF-TOKEN': getCookie('csrf_access_token'),
      }
    })
    return res.data
  }
}

export default PaletteService