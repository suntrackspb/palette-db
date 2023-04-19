import {useEffect, useState} from "react";

const useConfirmPassword = (initialValue, password) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  const onChange = e => {
    const value = e.target.value
    setValue(value)
    toggleError(value)
  }

  const toggleError = value => {
    if (value && value !== password) {
      setError('Пароли не совпадают')
      setIsValid(false)
    } else {
      setError('')
      setIsValid(true)
    }
  }

  useEffect(() => {
    toggleError(value)
  }, [password]);

  return {value, setValue, error, isValid, onChange}
}

export default useConfirmPassword