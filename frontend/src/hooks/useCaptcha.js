import {useEffect, useState} from "react";

const useCaptcha = (depsArr) => {
  const [isCaptchaDone, setIsCaptchaDone] = useState(false);
  const [isCaptchaVisible, setIsCaptchaVisible] = useState(false);

  useEffect(() => {
    if (depsArr.every(dep => dep !== '')) {
      setIsCaptchaVisible(true)
    } else {
      setIsCaptchaVisible(false)
      setIsCaptchaDone(false)
    }
  }, depsArr);

  const handleCaptcha = value => {
    value
      ? setIsCaptchaDone(true)
      : setIsCaptchaDone(false)
  }
  return {isCaptchaDone, isCaptchaVisible, setIsCaptchaVisible, handleCaptcha}
}
export default useCaptcha