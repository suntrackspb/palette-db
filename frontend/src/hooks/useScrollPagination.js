import {useFetching} from "./index";
import {useEffect, useState} from "react";

const useScrollPagination = (callback, skipAmount, limit) => {
  const
    {fetchData, isLoading, error, setLoading} = useFetching(() => callback(), true),
    [data, setData] = useState([]),
    [skip, setSkip] = useState(skipAmount),
    [isLast, setIsLast] = useState(false);

  const handleScrollPagination = (e) => {
    const
      target = e.target,
      scrollHeight = target.documentElement.scrollHeight,
      scrollTop = target.documentElement.scrollTop,
      innerHeight = window.innerHeight

    if (scrollHeight - (scrollTop + innerHeight) < 50) {
      setLoading(true)
    }
  }


  useEffect(() => {
    if (isLoading) {
      fetchData()
        .then(res => {
          setData([...data, ...res])
          setSkip(prev => prev + limit)
          setIsLast(res.length < limit)
        })
        .catch(() => console.log())
        .finally(() => {
          setLoading(false)
        })
    }
  }, [isLoading])

  return {data, skip, isLoading, error, isLast, handleScrollPagination}
}

export default useScrollPagination