import {useState} from "react";

const useFetching = (callback, initialState = false) => {
  const
    [isLoading, setLoading] = useState(initialState),
    [error, setError] = useState(''),
    [noDataMessage, setNoDataMessage] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true)
      return await callback()
    }
    catch (e) {
      setError(e.message)
    }
    finally {
      setLoading(false)
    }
  }

  return {fetchData, isLoading, error, setLoading, noDataMessage, setNoDataMessage}
}

export default useFetching