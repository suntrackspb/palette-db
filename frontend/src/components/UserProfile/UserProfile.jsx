import React from 'react';
import {Box, Skeleton, Typography} from "@mui/material";
import {styles} from "./styles.js";
import ContentBlock from "../ContentBlock/ContentBlock.jsx";

const UserProfile = ({data}) => {
  const {avatar, login, create} = data
  return (
    <ContentBlock styleProps={{mt: 2}}>
      {login
        ? <Box className='flex-col-c' sx={{gap: 1}}>
            <Box component='img' sx={styles.img} src={'https://faaalc.ru/img/avatar.jpg'}/>
            <Typography variant='h5'>{login}</Typography>
            <Typography>Дата регистрации: {new Date(create).toLocaleDateString()}</Typography>
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
    </Box>
  )
}

export default UserProfile;