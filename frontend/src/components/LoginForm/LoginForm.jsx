import {useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {
  Box,
  Button,
  FormControl, FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import ReCAPTCHA from "react-google-recaptcha";

import useAuth from "../../hooks/useAuth.js";
import ContentBlock from "../ContentBlock/ContentBlock.jsx";
import PageTitle from "../PageTitle/PageTitle.jsx";
import useValidation from "../../hooks/useValidation.js";
import Loader from "../Loader/Loader.jsx";
import {CAPTCHA_SITE_KEY} from "../../consts/index.js";
import {styles} from "./styles.js";
import {vocabulary} from "../../vocabulary/vocabulary.js";


const LoginForm = () => {
  const {store} = useAuth()
  const login = useValidation('', 'email');
  const password = useValidation('', 'password');
  const [action, setAction] = useState('signIn');
  const [showPassword, setShowPassword] = useState(false);
  const [isCaptchaDone, setIsCaptchaDone] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const location = useLocation()

  const handleClickShowPassword = () => setShowPassword(prev => !prev);
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
        .finally(() => setIsLoading(false))
    } else {
      setIsLoading(true)
      store.registration(login.value.toLowerCase(), password.value)
        .then(() => {
          if (store.success) {
            changeAction()
          }
        })
        .finally(() => setIsLoading(false))
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

  const handleCaptcha = value => {
    value
      ? setIsCaptchaDone(true)
      : setIsCaptchaDone(false)
  }

  return (
    <ContentBlock styleProps={styles.block} component='form' onSubmit={handleSubmit}>
      <PageTitle title={action === 'signIn' ? 'Авторизация' : 'Регистрация'} m='0'/>

      {location.search.includes('verify=true') &&
        <Typography color='success.main' textAlign='center'>{vocabulary.emailVerificationSuccess}</Typography>}

      {store.errorMessage &&
        <Typography color='error' textAlign='center'>{store.errorMessage}</Typography>}

      {store.successMessage &&
        <Typography color='success.main' sx={{whiteSpace: 'pre-wrap'}} textAlign='center'>{store.successMessage}</Typography>}

      <FormControl>
        <InputLabel htmlFor="outlined-email">Email</InputLabel>
        <OutlinedInput
          value={login.value}
          onChange={login.onChange}
          autoFocus
          id="outlined-email"
          label="Email"
          type="email"
          error={action === 'signUp' && !!login.value && !login.isValid}
          required
        />
        <FormHelperText id="outlined-email" sx={{color: '#f44336'}}>
          {action === 'signUp' && login.error}
        </FormHelperText>
      </FormControl>

      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-password">Password</InputLabel>
        <OutlinedInput
          value={password.value}
          onChange={password.onChange}
          id="outlined-password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          error={action === 'signUp' && !!password.value && !password.isValid}
          required
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff/> : <Visibility/>}
              </IconButton>
            </InputAdornment>}
        />
        <FormHelperText id="outlined-password" sx={{color: '#f44336'}}>
          {action === 'signUp' && !!password.value && password.error}
        </FormHelperText>
      </FormControl>

      {action === 'signUp' &&
        <ReCAPTCHA
          sitekey={CAPTCHA_SITE_KEY}
          onChange={handleCaptcha}
          style={{margin: '0 auto'}}
        />}

      <Box alignSelf='center' className='flex-col-c'>
        <Button
          type='submit'
          variant='contained'
          color='secondary'
          sx={{px: 4}}
          disabled={action === 'signUp' ? isFormValid() : false}
        >
          <Typography component='span'>
            {action === 'signIn' ? 'Войти' : 'Зарегистрироваться'}
          </Typography>
        </Button>

        <Typography sx={{mt: 2, cursor: 'pointer'}} onClick={changeAction}>
          {action === 'signIn' ? 'Нет аккаунта?' : 'Есть аккаунт?'}
        </Typography>
      </Box>

      <Loader isLoading={isLoading}/>

    </ContentBlock>
  );
};

export default observer(LoginForm);