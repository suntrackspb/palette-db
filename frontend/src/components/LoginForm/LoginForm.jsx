import {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {Box, Button, Typography} from "@mui/material";

import {useAuth, useValidation, useCaptcha, useConfirmPassword} from "../../hooks";
import Captcha from "../Captcha/Captcha.jsx";
import {
  AlertBlock,
  ButtonSubmit,
  InputPassword,
  Input,
  ContentBlock,
  Loader,
  PageTitle,
  SnackBar
} from "../UI";
import {generatePassword, copyToClipboard} from "../../utils"

import {vocabulary} from "../../vocabulary/vocabulary.js";
import {styles} from "./styles.js";
import {colorsArr} from "../../consts/index.js";


const LoginForm = () => {
  const {store} = useAuth()
  const [isLoading, setIsLoading] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [action, setAction] = useState('signIn');
  const email = useValidation('', 'email');
  const password = useValidation('', 'password');
  const login = useValidation('', 'login');
  const confirmPassword = useConfirmPassword('', password.value)
  const {
    handleCaptcha,
    isCaptchaDone,
    setIsCaptchaVisible,
    isCaptchaVisible
  } = useCaptcha([email.value, password.value, login.value, confirmPassword.value])
  const navigate = useNavigate()
  const location = useLocation()

  const handleGeneratePass = () => {
    const pass = generatePassword()
    setIsAlertOpen(true)
    password.setValue(pass)
    copyToClipboard(pass)
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (action === 'signIn') {
      setIsLoading(true)
      store.login(email.value.toLowerCase(), password.value)
        .then(() => {
          if (store.isAuth) {
            store.setUserColor(colorsArr[Math.floor(Math.random() * colorsArr.length)])
            store.setErrorMessage('')
            store.setSuccessMessage('')
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
      store.registration(email.value.toLowerCase(), login.value, password.value)
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
    return !password.isValid ||
      !email.isValid ||
      !login.isValid ||
      !confirmPassword.isValid ||
      !isCaptchaDone
  }

  const changeAction = () => {
    setAction(prev => prev === 'signIn' ? 'signUp' : 'signIn')
    email.setValue('')
    password.setValue('')
    store.setErrorMessage('')
  }

  return (
    <>
      <ContentBlock styleProps={styles.block} component='form' onSubmit={handleSubmit}>
        <PageTitle title={action === 'signIn' ? 'Авторизация' : 'Регистрация'} m='0'/>

        {location.search.includes('verify=true') &&
          <AlertBlock type='success' text={vocabulary.emailVerificationSuccess}/>}

        {store.errorMessage &&
          <AlertBlock type='error' text={store.errorMessage}/>}

        {store.successMessage &&
          <AlertBlock type='success' text={store.successMessage}/>}

        {action === 'signIn'
          ? <SignIn
            email={email}
            password={password}
          />
          : <SignUp
            email={email}
            password={password}
            confirmPassword={confirmPassword}
            login={login}
            handleCaptcha={handleCaptcha}
            isCaptchaVisible={isCaptchaVisible}
            isFormValid={isFormValid}
            handleGeneratePass={handleGeneratePass}
          />}

        <Box alignSelf='center' className='flex-col-c'>
          <Typography sx={{cursor: 'pointer'}} onClick={changeAction}>
            {action === 'signIn' ? 'Нет аккаунта?' : 'Есть аккаунт?'}
          </Typography>
        </Box>

      </ContentBlock>

      <Loader isLoading={isLoading}/>
      <SnackBar
        open={isAlertOpen}
        setOpen={setIsAlertOpen}
        text='Пароль скопирован в буфер обмена'
      />
    </>
  );
};

const SignIn = ({email, password}) => {
  return (
    <>
      <Input
        fullWidth
        value={email.value}
        onChange={email.onChange}
        label='Почта'
        id='email'
        type='email'
        autoFocus
        required
      />

      <InputPassword
        fullWidth
        value={password.value}
        onChange={password.onChange}
        label='Пароль'
        id='password'
        required
      />

      <ButtonSubmit text='Войти'/>
    </>
  )
}
const SignUp = ({
  email,
  password,
  confirmPassword,
  login,
  handleCaptcha,
  isCaptchaVisible,
  isFormValid,
  handleGeneratePass
}) => {
  return (
    <>
      <Input
        autoComplete='off'
        fullWidth
        value={email.value}
        onChange={email.onChange}
        label='Почта'
        id='email'
        type='email'
        autoFocus
        required
        error={!!email.value && !email.isValid}
        errorMessage={!!email.value && email.error}
      />

      <Input
        autoComplete='off'
        fullWidth
        value={login.value}
        onChange={login.onChange}
        label='Логин'
        id='login'
        type='text'
        required
        error={!!login.value && !login.isValid}
        errorMessage={!!login.value && login.error}
      />

      <InputPassword
        fullWidth
        value={password.value}
        onChange={password.onChange}
        label='Пароль'
        id='password'
        required
        error={!!password.value && !password.isValid}
        errorMessage={!!password.value && password.error}
      />

      <InputPassword
        fullWidth
        autoComplete='off'
        value={confirmPassword.value}
        onChange={confirmPassword.onChange}
        id="confirmPassword"
        label="Подтвердите пароль"
        error={!!confirmPassword.error}
        errorMessage={confirmPassword.error}
      />

      <Button
        onClick={handleGeneratePass}
        sx={{
          alignSelf: 'flex-start',
          p: '4px',
          fontWeight: 300,
          fontSize: '12px'
        }}
      >
        Сгенерировать пароль
      </Button>

      <Captcha
        handleCaptcha={handleCaptcha}
        isCaptchaVisible={isCaptchaVisible}
      />

      <ButtonSubmit
        text='Зарегистрироваться'
        disabled={isFormValid()}
      />
    </>
  )
}

export default observer(LoginForm);