import {useState} from "react";

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

  return {value, error, onChange}
}

export default useConfirmPassword