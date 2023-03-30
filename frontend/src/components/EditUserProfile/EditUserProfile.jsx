import React, {useState} from 'react';
import ContentBlock from "../ContentBlock/ContentBlock.jsx";
import UserService from "../../api/UserService.js";
import {cryptoPass} from "../../utils/crypto.js";
import {
  Box,
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

const EditUserProfile = ({store}) => {
  const password = useValidation('', 'password');
  // const [confirmPassword, setConfirmPassword] = useState('');
  const confirmPassword = useConfirmPassword('', password.value)
  const [avatar, setAvatar] = useState('');
  const [oldPassword, setOldPassword] = useState('');


  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleClickShowPassword = () => setShowPassword(prev => !prev);

  const handleSubmit = e => {
    e.preventDefault()
    const userData = {
      old_password: oldPassword ? cryptoPass(oldPassword) : false,
      new_password: password.value ? cryptoPass(password.value) : false,
      avatar: avatar ? avatar : false
    }
    UserService.setUserInfo(userData)
      .then(res => {
        setSuccessMessage('Изменения успешно применены')
        store.setUser(res.data)
      })
    resetForm()
  }

  const resetForm = () => {
    setOldPassword('')
    setAvatar('')
    password.setValue('')
    confirmPassword.setValue('')
  }

  return (
    <ContentBlock className='flex-col' component='form' onSubmit={handleSubmit}>
      <Typography>Редактировать профиль</Typography>

      <FormControl variant='outlined' sx={{width: '100%'}}>
        <InputLabel htmlFor="outlined-email">Ссылка на аватарку</InputLabel>
        <OutlinedInput
          value={avatar}
          onChange={e => setAvatar(e.target.value)}
          id="outlined-email"
          label="Ссылка на аватарку"
          type="url"
        />
      </FormControl>

      <FormControl variant="outlined" sx={{width: '100%'}}>
        <InputLabel htmlFor="newPassword">Новый пароль</InputLabel>
        <OutlinedInput
          value={password.value}
          onChange={password.onChange}
          id="newPassword"
          type={showPassword ? 'text' : 'password'}
          label="Новый пароль"
          error={!!password.value && !password.isValid}
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
          {!!password.value && password.error}
        </FormHelperText>
      </FormControl>

      <FormControl variant="outlined" sx={{width: '100%'}}>
        <InputLabel htmlFor="confirmPassword">Подтвердите пароль</InputLabel>
        <OutlinedInput
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
        disabled={!(password.value === confirmPassword.value && !!oldPassword)}
      >
        <Typography component='span'>
          Сохранить
        </Typography>
      </Button>

      {successMessage &&
        <Typography color='success.main' textAlign='center'>{successMessage}</Typography>}

    </ContentBlock>
  );
};

export default EditUserProfile;