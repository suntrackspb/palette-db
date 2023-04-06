import {useEffect, useState} from "react";

const useCaptcha = (depsArr) => {
  const [isCaptchaDone, setIsCaptchaDone] = useState(false);
  const [isCaptchaVisible, setIsCaptchaVisible] = useState(false);

  useEffect(() => {
    depsArr.every(dep => dep !== '') && setIsCaptchaVisible(true)
  }, depsArr);

  const handleCaptcha = value => {
    value
      ? setIsCaptchaDone(true)
      : setIsCaptchaDone(false)
  }
  return {isCaptchaDone, isCaptchaVisible, setIsCaptchaVisible, handleCaptcha}
}
export default useCaptcha