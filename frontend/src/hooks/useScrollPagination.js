import useFetching from "./useFetching.js";
import {useEffect, useState} from "react";

const useScrollPagination = (callback, skipAmount, limit) => {
  const
    {fetchData, isLoading, error, setLoading} = useFetching(() => callback(), true),
    [data, setData] = useState([]),
    [skip, setSkip] = useState(skipAmount),
    [isLast, setIsLast] = useState(false);

  const handleScroll = (e) => {
    const
      target = e.target,
      scrollHeight = target.documentElement.scrollHeight,
      scrollTop = target.documentElement.scrollTop,
      innerHeight = window.innerHeight

    if (scrollHeight - (scrollTop + innerHeight) < 100) {
      setLoading(true)
    }
  }


  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
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
      document.body.style.overflow = "auto";
    }
  }, [isLoading])

  return {data, skip, isLoading, error, isLast, handleScroll}
}

export default useScrollPagination