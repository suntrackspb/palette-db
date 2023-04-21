
import React from 'react';
import { Grid, Typography, Container, Link, Box } from '@mui/material';
import { Telegram, GitHub } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{mt: 3, bgcolor: 'header.main', p: '10px'}}>
      <Container maxWidth='xl' sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
 <Grid container justifyContent="center">
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Sitemap
            </Typography>
            <Typography variant="body2">
              <Link href="/" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Главная
              </Link>
              <Link href="/palettes" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Палитры
              </Link>
              <Link href="/contact" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Контакты
              </Link>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email: webmaster@sntrk.ru
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Create in collab
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              SunTrack & Faaalc
            </Typography>
            <Typography variant="body2">
              <Link href="https://github.com/suntrackspb" color="inherit" sx={{ mr: 2 }}>
                <GitHub />
              </Link>
              <Link href="https://t.me/denisuvarov" color="inherit" sx={{ mr: 2 }}>
                <Telegram />
              </Link>
              <Link href="https://github.com/fil4tov" color="inherit" sx={{ mr: 2 }}>
                <GitHub />
              </Link>
              <Link href="https://t.me/fil4tov" color="inherit" sx={{ mr: 2 }}>
                <Telegram />
              </Link>
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Legal
            </Typography>
            <Typography variant="body2">
              <Link href="/terms-of-service" color="inherit" sx={{ display: 'block', mb: 1 }}>
                Terms of Service
              </Link>
              <Typography variant="caption">
                © {new Date().getFullYear()} Palettify. All rights reserved.
              </Typography>
            </Typography>
          </Box>
        </Grid>
      </Grid>
      </Container>
    </Box>
  );
};

export default Footer;