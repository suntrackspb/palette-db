import {useState} from 'react';
import ContentBlock from "../ContentBlock/ContentBlock.jsx";
import PageTitle from "../PageTitle/PageTitle.jsx";
import Input from "../UI/Inputs/Input.jsx";
import TextArea from "../UI/Inputs/TextArea.jsx";
import ButtonSubmit from "../UI/Buttons/ButtonSubmit.jsx";
import Captcha from "../Captcha/Captcha.jsx";
import useCaptcha from "../../hooks/useCaptcha.js";
import Loader from "../Loader/Loader.jsx";
import AlertBlock from "../UI/Alerts/AlertBlock.jsx";
import UserService from "../../api/UserService.js";
import {vocabulary} from "../../vocabulary/vocabulary.js";

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const {
    handleCaptcha,
    isCaptchaDone,
    isCaptchaVisible,
    setIsCaptchaVisible
  } = useCaptcha([name, email, message])
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const isFormValid = () => {
    return !name || !email || !message || !isCaptchaDone
  }

  const handleSubmit = e => {
    e.preventDefault()
    setIsLoading(true)
    UserService.sendFeedbackForm({name, email, message})
      .then(() => setSuccess(true))
      .catch(e => {
        setError(vocabulary[e.response.data.code])
      })
      .finally(() => {
        setIsLoading(false)
        setIsCaptchaVisible(false)
      })
  }

  return (
    <>
      <ContentBlock
        className='flex-col-c'
        styleProps={{mt: 2, mx: 'auto', width: '50%'}}
        component='form'
        onSubmit={handleSubmit}
      >
        <PageTitle title='Форма обратной связи' m='0'/>

        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          id='name'
          label='Имя'
          type='text'
          required
        />
        <Input
          value={email}
          onChange={e => setEmail(e.target.value)}
          id='email'
          label='Email'
          type='email'
          required
        />
        <TextArea
          value={message}
          onChange={e => setMessage(e.target.value)}
          label='Сообщение'
          required
        />

        {isCaptchaVisible &&
          <Captcha handleCaptcha={handleCaptcha}/>}

        <ButtonSubmit
          text='Отправить'
          disabled={isFormValid()}
          width='50%'
        />

        {success &&
          <AlertBlock type='success' text={vocabulary.feedbackSuccess} width='50%'/>}

        {error &&
          <AlertBlock type='error' text={error} width='50%'/>}
        
      </ContentBlock>
      <Loader isLoading={isLoading}/>
    </>
  );
};

export default FeedbackForm;