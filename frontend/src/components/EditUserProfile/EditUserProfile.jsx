import {useEffect, useState} from 'react';
import {cryptoPass} from "../../utils/crypto.js";
import {Typography} from "@mui/material";
import {useAuth, useConfirmPassword, useValidation} from "../../hooks";
import {observer} from "mobx-react-lite";
import {
  ButtonSubmit,
  ContentBlock,
  Input,
  InputPassword,
  Loader,
  AlertBlock
} from "../UI";

const EditUserProfile = () => {
  const {store} = useAuth()
  const newPassword = useValidation('', 'password');
  const confirmPassword = useConfirmPassword('', newPassword.value)
  const [avatar, setAvatar] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [loading, setLoading] = useState(false);

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
    <ContentBlock styleProps={{width: '40%'}} className='flex-col' component='form' autoComplete='off' onSubmit={handleSubmit}>
      <Typography>Редактировать профиль</Typography>

      <Input
        fullWidth
        value={avatar}
        onChange={e => setAvatar(e.target.value)}
        id='email'
        label="Ссылка на аватарку"
        type="url"
        autoComplete='off'
        readOnly
        onFocus={e => e.target.removeAttribute('readonly')}
      />

      <InputPassword
        fullWidth
        autoComplete='off'
        value={newPassword.value}
        onChange={newPassword.onChange}
        id="newPassword"
        label="Новый пароль"
        error={!!newPassword.value && !newPassword.isValid}
        errorMessage={!!newPassword.value && newPassword.error}
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

      <Typography>Для сохранения изменений введите текущий пароль</Typography>

      <InputPassword
        fullWidth
        autoComplete='off'
        value={oldPassword}
        onChange={e => setOldPassword(e.target.value)}
        id="currentPassword"
        label="Введите пароль"
      />

      <ButtonSubmit
        disabled={!(newPassword.value === confirmPassword.value && !!oldPassword)}
        text='Сохранить'
      />

      {store.successMessage &&
        <AlertBlock type='success' text={store.successMessage}/>}

      {store.errorMessage &&
        <AlertBlock type='error' text={store.errorMessage}/>}

      <Loader isLoading={loading}/>

    </ContentBlock>
  );
};

export default observer(EditUserProfile);