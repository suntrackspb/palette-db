import React from 'react';
import {Box, Container, Typography} from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{mt: 3, bgcolor: 'header.main', p: '10px'}}>
      <Container maxWidth='xl' sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <Typography variant='body2'>&copy; 2023 Palettify</Typography>
        <Box>
          <Typography variant='body2'>Frontend - Faaalc</Typography>
          <Typography variant='body2'>Backend - SunTrack</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;