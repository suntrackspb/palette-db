import {useState} from 'react';
import Captcha from "../Captcha/Captcha.jsx";
import {useCaptcha} from "../../hooks";
import {
  AlertBlock,
  Input,
  TextArea,
  ButtonSubmit,
  ContentBlock,
  Loader,
  PageTitle
} from "../UI";
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

  const resetForm = () => {
    setEmail('')
    setMessage('')
    setName('')
  }

  const handleSubmit = e => {
    e.preventDefault()
    setIsLoading(true)
    UserService.sendFeedbackForm({name, email, message})
      .then(() => {
        setSuccess(true)
        resetForm()
      })
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
        styleProps={{
          mt: 2,
          mx: 'auto',
          width: {xl: '50%', lg: '50%', md: '60%', sm: '90%', xs: '100%'}
      }}
        component='form'
        onSubmit={handleSubmit}
      >
        <PageTitle title='Форма обратной связи' m='0'/>

        <Input
          fullWidth
          value={name}
          onChange={e => setName(e.target.value)}
          id='name'
          label='Имя'
          type='text'
          required
        />
        <Input
          fullWidth
          value={email}
          onChange={e => setEmail(e.target.value)}
          id='email'
          label='Email'
          type='email'
          required
        />
        <TextArea
          fullWidth
          value={message}
          onChange={e => setMessage(e.target.value)}
          label='Сообщение'
          required
        />

        <Captcha
          handleCaptcha={handleCaptcha}
          isCaptchaVisible={isCaptchaVisible}
        />

        <ButtonSubmit
          text='Отправить'
          disabled={isFormValid()}
          width='302px'
        />

        {success &&
          <AlertBlock type='success' text={vocabulary.feedbackSuccess} width='302px'/>}

        {error &&
          <AlertBlock type='error' text={error} width='302px'/>}
        
      </ContentBlock>
      <Loader isLoading={isLoading}/>
    </>
  );
};

export default FeedbackForm;