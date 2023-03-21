import CryptoJS from "crypto-js";

export const cryptoKey = () => {
  const date = new Date()
  const addZero = (num) => {
    return num.toString().length < 2
      ? `0${num}`
      : num.toString()
  }
  const dateTime = `${date.getUTCFullYear()}-${addZero(date.getUTCMonth() + 1)}-${addZero(date.getUTCDate())}`

  const hash = CryptoJS.SHA1(`D4f0g6g${dateTime}CC22`);
  return CryptoJS.enc.Hex.stringify(hash)
}

export const cryptoPass = (password) => {
  const hash = CryptoJS.MD5(password)
  return CryptoJS.enc.Hex.stringify(hash)
}