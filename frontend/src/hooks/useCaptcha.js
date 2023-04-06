import {useState} from "react";

const useCaptcha = () => {
  const [isCaptchaDone, setIsCaptchaDone] = useState(false);
  const handleCaptcha = value => {
    value
      ? setIsCaptchaDone(true)
      : setIsCaptchaDone(false)
  }
  return {isCaptchaDone, handleCaptcha}
}
export default useCaptcha