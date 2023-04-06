import {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Box, Typography} from "@mui/material";

import useAuth from "../../hooks/useAuth.js";
import useValidation from "../../hooks/useValidation.js";
import useCaptcha from "../../hooks/useCaptcha.js";
import Captcha from "../Captcha/Captcha.jsx";
import {
  AlertBlock,
  ButtonSubmit,
  InputPassword,
  Input,
  ContentBlock,
  Loader,
  PageTitle
} from "../UI";

import {vocabulary} from "../../vocabulary/vocabulary.js";
import {styles} from "./styles.js";


const LoginForm = () => {
  const {store} = useAuth()
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState('signIn');
  const login = useValidation('', 'email');
  const password = useValidation('', 'password');
  const {
    handleCaptcha,
    isCaptchaDone,
    setIsCaptchaVisible,
    isCaptchaVisible
  } = useCaptcha([login.value, password.value])
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = e => {
    e.preventDefault()
    if (action === 'signIn') {
      setIsLoading(true)
      store.login(login.value.toLowerCase(), password.value)
        .then(() => {
          if (store.isAuth) {
            store.checkAuth()
              .then(() => navigate('/', {replace: true}))
          }
        })
        .finally(() => {
          setIsLoading(false)
          setIsCaptchaVisible(false)
        })
    } else {
      setIsLoading(true)
      store.registration(login.value.toLowerCase(), password.value)
        .then(() => {
          if (store.success) {
            changeAction()
          }
        })
        .finally(() => {
          setIsLoading(false)
          setIsCaptchaVisible(false)
        })
    }
  }

  const isFormValid = () => {
    return !password.isValid || !login.isValid || !isCaptchaDone
  }

  const changeAction = () => {
    setAction(prev => prev === 'signIn' ? 'signUp' : 'signIn')
    login.setValue('')
    password.setValue('')
    store.setErrorMessage('')
  }

  return (
    <ContentBlock styleProps={styles.block} component='form' onSubmit={handleSubmit}>
      <PageTitle title={action === 'signIn' ? 'Авторизация' : 'Регистрация'} m='0'/>

      {location.search.includes('verify=true') &&
        <AlertBlock type='success' text={vocabulary.emailVerificationSuccess}/>}

      {store.errorMessage &&
        <AlertBlock type='error' text={store.errorMessage}/>}

      {store.successMessage &&
        <AlertBlock type='success' text={store.successMessage}/>}

      <Input
        fullWidth
        value={login.value}
        onChange={login.onChange}
        label='Email'
        id='email'
        type='email'
        autoFocus
        required
        error={action === 'signUp' && !!login.value && !login.isValid}
        errorMessage={action === 'signUp' && !!login.value && login.error}
      />

      <InputPassword
        fullWidth
        value={password.value}
        onChange={password.onChange}
        label='Пароль'
        id='password'
        required
        error={action === 'signUp' && !!password.value && !password.isValid}
        errorMessage={action === 'signUp' && !!password.value && password.error}
      />

      {action === 'signUp' &&
        <Captcha
          handleCaptcha={handleCaptcha}
          isCaptchaVisible={isCaptchaVisible}
        />}

      <Box alignSelf='center' className='flex-col-c'>
        <ButtonSubmit
          text={action === 'signIn' ? 'Войти' : 'Зарегистрироваться'}
          disabled={action === 'signUp' ? isFormValid() : false}
        />

        <Typography sx={{mt: 2, cursor: 'pointer'}} onClick={changeAction}>
          {action === 'signIn' ? 'Нет аккаунта?' : 'Есть аккаунт?'}
        </Typography>
      </Box>

      <Loader isLoading={isLoading}/>

    </ContentBlock>
  );
};

export default observer(LoginForm);