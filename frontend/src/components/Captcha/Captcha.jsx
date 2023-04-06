import {CAPTCHA_SITE_KEY} from "../../consts/index.js";
import ReCAPTCHA from "react-google-recaptcha";

const Captcha = ({handleCaptcha}) => {
  return (
    <ReCAPTCHA
      sitekey={CAPTCHA_SITE_KEY}
      onChange={handleCaptcha}
      theme='dark'
      style={{margin: '0 auto'}}
    />
  );
};

export default Captcha;