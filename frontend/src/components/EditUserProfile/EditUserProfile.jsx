import React, {useEffect, useState} from 'react';
import ContentBlock from "../ContentBlock/ContentBlock.jsx";
import {cryptoPass} from "../../utils/crypto.js";
import {
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import useValidation from "../../hooks/useValidation.js";
import useConfirmPassword from "../../hooks/useConfirmPassword.js";
import useAuth from "../../hooks/useAuth.js";
import {observer} from "mobx-react-lite";
import Loader from "../Loader/Loader.jsx";

const EditUserProfile = () => {
  const {store} = useAuth()
  const newPassword = useValidation('', 'password');
  const confirmPassword = useConfirmPassword('', newPassword.value)
  const [avatar, setAvatar] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [loading, setLoading] = useState(false);


  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(prev => !prev);

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    const userData = {
      old_password: oldPassword ? cryptoPass(oldPassword) : false,
      new_password: newPassword.value ? cryptoPass(newPassword.value) : false,
      avatar: avatar ? avatar : false
    }
    store.updateUser(userData)
      .then(() => {
        store.successMessage && resetForm()
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    return () => {
      store.setSuccessMessage('')
      store.setErrorMessage('')
    }
  }, []);

  const resetForm = () => {
    setOldPassword('')
    setAvatar('')
    newPassword.setValue('')
    confirmPassword.setValue('')
  }

  return (
    <ContentBlock className='flex-col' component='form' autoComplete='off' onSubmit={handleSubmit}>
      <Typography>Редактировать профиль</Typography>

      <FormControl variant='outlined' sx={{width: '100%'}}>
        <InputLabel htmlFor="outlined-email">Ссылка на аватарку</InputLabel>
        <OutlinedInput
          value={avatar}
          onChange={e => setAvatar(e.target.value)}
          id="outlined-email"
          label="Ссылка на аватарку"
          type="url"
          autoComplete='off'
          readOnly
          onFocus={e => e.target.removeAttribute('readonly')}
        />
      </FormControl>

      <FormControl variant="outlined" sx={{width: '100%'}}>
        <InputLabel htmlFor="newPassword">Новый пароль</InputLabel>
        <OutlinedInput
          autoComplete='off'
          value={newPassword.value}
          onChange={newPassword.onChange}
          id="newPassword"
          type={showPassword ? 'text' : 'password'}
          label="Новый пароль"
          error={!!newPassword.value && !newPassword.isValid}
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
          {!!newPassword.value && newPassword.error}
        </FormHelperText>
      </FormControl>

      <FormControl variant="outlined" sx={{width: '100%'}}>
        <InputLabel htmlFor="confirmPassword">Подтвердите пароль</InputLabel>
        <OutlinedInput
          autoComplete='off'
          value={confirmPassword.value}
          onChange={confirmPassword.onChange}
          id="confirmPassword"
          type={showPassword ? 'text' : 'password'}
          label="Подтвердите пароль"
          error={!!confirmPassword.error}
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
          {confirmPassword.error}
        </FormHelperText>
      </FormControl>

      <Typography>Для сохранения изменений введите текущий пароль</Typography>
      <FormControl variant="outlined" sx={{width: '100%'}}>
        <InputLabel htmlFor="currentPassword">Введите пароль</InputLabel>
        <OutlinedInput
          autoComplete='off'
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
          id="currentPassword"
          type={showPassword ? 'text' : 'password'}
          label="Введите пароль"
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
      </FormControl>

      <Button
        type='submit'
        variant='contained'
        color='secondary'
        sx={{px: 4}}
        disabled={!(newPassword.value === confirmPassword.value && !!oldPassword)}
      >
        <Typography component='span'>
          Сохранить
        </Typography>
      </Button>

      {store.successMessage &&
        <Typography color='success.main' textAlign='center'>{store.successMessage}</Typography>}

      {store.errorMessage &&
        <Typography color='error' textAlign='center'>{store.errorMessage}</Typography>}

      <Loader isLoading={loading}/>

    </ContentBlock>
  );
};

export default observer(EditUserProfile);