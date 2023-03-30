import React from 'react';
import {Box, Skeleton, Typography} from "@mui/material";
import {styles} from "./styles.js";
import ContentBlock from "../ContentBlock/ContentBlock.jsx";
import useAuth from "../../hooks/useAuth.js";
import {observer} from "mobx-react-lite";

const UserProfile = () => {
  const {store} = useAuth()
  const {avatar, login, create, verify} = store.user
  return (
    <ContentBlock>
      {login
        ? <Box className='flex-col-c' sx={{gap: 1}}>
            <Box component='img' sx={styles.img} src={avatar}/>
            <Typography variant='h5'>{login}</Typography>
            <Typography>Дата регистрации: {new Date(create).toLocaleDateString()}</Typography>
            <Typography>{verify && 'Аккаунт подтвержден'}</Typography>
          </Box>
        : <SkeletonBlock/>}
    </ContentBlock>
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