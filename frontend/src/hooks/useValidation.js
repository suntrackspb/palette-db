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
          setError('Пароль должен содержать хотя бы одну прописную и одну строчную букву, а также цифру. Мин длина 8 символов, только латинские символы')
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
    }
  }, [value]);

  return {value, setValue, error, isValid, onChange}
}

export default useValidation