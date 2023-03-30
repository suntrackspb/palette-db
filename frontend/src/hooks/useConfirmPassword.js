import {useEffect, useState} from "react";

const useConfirmPassword = (initialValue, password) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const onChange = e => {
    const value = e.target.value
    setValue(value)
    if (value !== password) {
      setError('Пароли не совпадают')
    }
    else {
      setError('')
    }
  }
  useEffect(() => {
    if (!!value && value !== password) {
      setError('Пароли не совпадают')
    }
    else {
      setError('')
    }
  }, [password]);

  return {value, setValue, error, onChange}
}

export default useConfirmPassword