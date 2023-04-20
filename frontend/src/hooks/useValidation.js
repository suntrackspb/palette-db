import {useEffect, useState} from "react";

const useValidation = (initialValue, type) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const onChange = e => {
    setValue(e.target.value)
  }

  useEffect(() => {
    switch (type) {
      case 'password':
        const passReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        if (!passReg.test(value)) {
          setError('Пароль должен содержать хотя бы одну прописную и одну строчную букву, а также цифру. Мин длина 8 символов, только английские символы')
          setIsValid(false)
        } else {
          setError('')
          setIsValid(true)
        }
        break
      case 'email':
        const emailReg = /^[a-z0-9]+[\._-]?[a-z0-9]+[@]\w+[.]\w{2,3}$/
        if (!emailReg.test(value.toLowerCase())) {
          setError('Введите корректный email')
          setIsValid(false)
        } else {
          setError('')
          setIsValid(true)
        }
        break
      case 'login':
        const loginReg = /^[А-Яа-яA-Za-z0-9ёЁ]{3,24}$/
        if (!loginReg.test(value)) {
          setError('Логин должен содержать от 3 до 24 символов. Допустимы русские, английские символы и цифры')
          setIsValid(false)
        } else {
          setError('')
          setIsValid(true)
        }
        break
      case 'imgUrl':
        const imgReg = /^https?:\/\/\S+(?:jpg|jpeg|png|webp)$/
        if (!imgReg.test(value)) {
          setError('Введите корректную ссылку на изображение, заканчивающуюся на jpg, jpeg, png или webp')
          setIsValid(false)
        } else {
          setError('')
          setIsValid(true)
        }
        break
    }
  }, [value]);

  return {value, setValue, error, isValid, onChange}
}

export default useValidation