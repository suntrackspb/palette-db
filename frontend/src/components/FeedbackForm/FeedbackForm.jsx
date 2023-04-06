import React, {useState} from 'react';
import {Alert} from "@mui/material";
import ContentBlock from "../ContentBlock/ContentBlock.jsx";
import PageTitle from "../PageTitle/PageTitle.jsx";
import Input from "../UI/Inputs/Input.jsx";
import TextArea from "../UI/Inputs/TextArea.jsx";
import ButtonSubmit from "../UI/Buttons/ButtonSubmit.jsx";
import Captcha from "../Captcha/Captcha.jsx";
import useCaptcha from "../../hooks/useCaptcha.js";
import UserService from "../../api/UserService.js";
import useFetching from "../../hooks/useFetching.js";
import Loader from "../Loader/Loader.jsx";
import {vocabulary} from "../../vocabulary/vocabulary.js";

const FeedbackForm = () => {
  const {handleCaptcha, isCaptchaDone} = useCaptcha()
  const {fetchData, isLoading} = useFetching(async () => {
    return await UserService.sendFeedbackForm({name, email, message})
  })
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const isFormValid = () => {
    return !name || !email || !message || !isCaptchaDone
  }

  const handleSubmit = e => {
    e.preventDefault()
    fetchData()
      .then(() => setSuccess(true))
      .catch(e => console.log(e))
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
          required={true}
        />
        <Input
          value={email}
          onChange={e => setEmail(e.target.value)}
          id='email'
          label='Email'
          type='email'
          required={true}
        />
        <TextArea
          value={message}
          onChange={e => setMessage(e.target.value)}
          label='Сообщение'
          required={true}
        />
        <Captcha
          handleCaptcha={handleCaptcha}
        />

        <ButtonSubmit
          text='Отправить'
          disabled={isFormValid()}
        />

        {success && <Alert severity="success">{vocabulary.feedbackSuccess}</Alert>}
        
      </ContentBlock>
      <Loader isLoading={isLoading}/>
    </>
  );
};

export default FeedbackForm;