import {useEffect, useState} from "react";

const useConfirmPassword = (initialValue, password) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');

  const onChange = e => {
    const value = e.target.value
    setValue(value)
    toggleError(value)
  }
  
  const toggleError = value => {
    value && value !== password
      ? setError('Пароли не совпадают')
      : setError('')
  }

  useEffect(() => {
    toggleError(value)
  }, [password]);

  return {value, setValue, error, onChange}
}

export default useConfirmPassword