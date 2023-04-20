import React, {useEffect, useState} from 'react';
import {Box, Skeleton, TextField, Typography} from "@mui/material";
import {styles} from "./styles.js";
import {ContentBlock, ModalDialog, SnackBar} from "../UI";
import {useAuth, useValidation} from "../../hooks";
import {observer} from "mobx-react-lite";
import PersonIcon from '@mui/icons-material/Person';

const UserProfile = () => {
  const {store} = useAuth()
  const {avatar, login, create, verify, username} = store.user
  const [isSnackOpen, setIsSnackOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isModalChangeOpen, setIsModalChangeOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const ava = useValidation('', 'imgUrl')

  const handleModalChangeSubmit = () => {
    store.updateAvatar(ava.value)
      .then(() => {
        closeModalChange()
        setIsSnackOpen(true)
        setSuccessMessage(store.successMessage)
      })
      .catch(console.log)
  }
  const handleModalDeleteSubmit = () => {
    store.updateAvatar('None')
      .then(() => {
        closeModalDelete()
        setIsSnackOpen(true)
        setSuccessMessage(store.successMessage)
      })
      .catch(console.log)
  }
  const closeModalChange = () => {
    setIsModalChangeOpen(false)
    ava.setValue('')
  }
  const closeModalDelete = () => {
    setIsModalDeleteOpen(false)
  }

  useEffect(() => {
    return () => {
      store.setSuccessMessage('')
      store.setErrorMessage('')
    }
  }, []);

  return (
    <>
      <ContentBlock styleProps={{width: '30%'}}>
        {login
          ? <Box className='flex-col-c' sx={{gap: 1}}>
            <Box position='relative'>
              {avatar
                ? <Box component='img' sx={styles.img} src={avatar}/>
                : <Box sx={{...styles.noImg, bgcolor: store.userColor}}>
                  <PersonIcon sx={{fontSize: '90px', color: '#fff'}}/>
                </Box>}
              <Box component='ul' sx={styles.list}>
                <Box component='li'>
                  <Typography
                    sx={styles.item}
                    onClick={() => setIsModalChangeOpen(true)}
                  >Обновить аватарку</Typography>
                </Box>
                <Box component='li'>
                  <Typography
                    sx={styles.item}
                    color='#ff4545'
                    onClick={() => setIsModalDeleteOpen(true)}
                  >Удалить аватарку</Typography>
                </Box>
              </Box>
            </Box>
            <Typography variant='h5'>{username}</Typography>
            <Typography>{login}</Typography>
            <Typography>Дата регистрации: {new Date(create).toLocaleDateString()}</Typography>
            <Typography>{verify && 'Аккаунт подтвержден'}</Typography>
          </Box>
          : <SkeletonBlock/>}
      </ContentBlock>

      <ModalDialog
        isOpen={isModalChangeOpen}
        handleClose={closeModalChange}
        handleSubmit={handleModalChangeSubmit}
        title='Обновить аватар'
        fullWidth
        maxWidth='xs'
      >
        <TextField
          autoFocus
          label="Ссылка на аватар"
          type="url"
          fullWidth
          variant="standard"
          value={ava.value}
          onChange={ava.onChange}
          error={!!ava.value && !!ava.error}
          helperText={!!ava.value && ava.error}
        />
      </ModalDialog>

      <ModalDialog
        isOpen={isModalDeleteOpen}
        handleClose={closeModalDelete}
        handleSubmit={handleModalDeleteSubmit}
        title='Удалить аватар?'
        fullWidth
        maxWidth='xs'
      />

      <SnackBar open={isSnackOpen} text={successMessage} setOpen={setIsSnackOpen}/>
    </>
  );
};

const SkeletonBlock = () => {
  return (
    <Box className='flex-col-c' sx={{gap: 1}}>
      <Skeleton variant="circular" width={150} height={150}/>
      <Skeleton variant="text" sx={{fontSize: '1rem', width: '100%'}}/>
      <Skeleton variant="text" sx={{fontSize: '1rem', width: '100%'}}/>
      <Skeleton variant="text" sx={{fontSize: '1rem', width: '100%'}}/>
    </Box>
  )
}

export default observer(UserProfile);