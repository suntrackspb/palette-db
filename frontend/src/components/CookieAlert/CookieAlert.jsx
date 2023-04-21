import React, {useLayoutEffect, useState} from 'react';
import {Alert, Box, Button, Typography} from "@mui/material";

const CookieAlert = () => {
  const [isVisible, setIsVisible] = useState(true);

  useLayoutEffect(() => {
    if (localStorage.getItem('accept-cookie')) {
      setIsVisible(false)
    }
  }, [])

  const acceptCookie = () => {
    localStorage.setItem('accept-cookie', 'true')
    setIsVisible(false)
  }

  return (
    <>
      {isVisible && <Box sx={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        left: '20px'
      }}>
        <Alert
          variant="filled"
          severity="info"
          sx={{
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            '& .MuiAlert-message': {
              display: 'flex',
              alignItems: 'center',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%'
            }
          }}
        >
          <Typography mr={2}>Этот сайт использует cookie для хранения данных. Продолжая использовать сайт, вы даете согласие на работу с этими файлами.</Typography>
          <Button
            variant='outlined'
            sx={{
              ml: {xs: '0', sm: 'auto'},
              mt: {xs: 1, sm: 0},
              whiteSpace: 'nowrap',
              minWidth: 'auto'
          }}
            onClick={acceptCookie}
          >
            Принять и закрыть
          </Button>
        </Alert>
      </Box>}
    </>
  );
};

export default CookieAlert;