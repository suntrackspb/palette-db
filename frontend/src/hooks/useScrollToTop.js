import {useState} from "react";

const useScrollToTop = () => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const handleScrollFromTop = (e) => {
    const
      target = e.target,
      scrollTop = target.documentElement.scrollTop

    scrollTop > 1000
      ? setIsButtonVisible(true)
      : setIsButtonVisible(false)
  }

  return {isButtonVisible, handleScrollFromTop}
}

export default useScrollToTop