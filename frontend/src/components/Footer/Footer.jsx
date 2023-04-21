import React from 'react';
import {Typography, Container, Box} from '@mui/material';
import {Telegram, GitHub} from '@mui/icons-material';
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <Box component='footer' sx={{mt: 'auto', bgcolor: 'header.main', p: '15px'}}>
      <Container maxWidth='xl'>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: {
            lg: 'repeat(4, max-content)',
            md: 'repeat(2, max-content)',
            sm: 'repeat(2, max-content)',
            xs: 'max-content'
          },
          gridTemplateRows: '1fr',
          gridColumnGap: '120px',
          gridRowGap: '20px',
          justifyContent: {
            xs: 'start',
            sm: 'center'
          }
        }}>

          <Box>
            <FooterTitle text='Ссылки'/>
            <Box component='ul'>
              <li>
                <FooterSubtitle>
                  <Link to='/' color="inherit">Главная</Link>
                </FooterSubtitle>
              </li>
              <li>
                <FooterSubtitle>
                  <Link to='palettes' color="inherit">Палитры</Link>
                </FooterSubtitle>
              </li>
              <li>
                <FooterSubtitle>
                  <Link to='feedback' color="inherit">Контакты</Link>
                </FooterSubtitle>
              </li>
            </Box>
          </Box>

          <Box>
            <FooterTitle text='Связаться с нами'/>
            <FooterSubtitle>
              Email: webmaster@sntrk.ru
            </FooterSubtitle>
          </Box>

          <Box>
            <FooterTitle text='Команда разработки'/>
            <FooterSubtitle>
              <Box component='a' href='https://github.com/fil4tov' target='_blank' sx={{display: 'flex', alignItems: 'center', gap: '5px', mb: '5px'}}>
                <GitHub fontSize='small'/> Fil4tov
              </Box>
            </FooterSubtitle>
            <FooterSubtitle>
              <Box component='a' href='https://github.com/suntrackspb' target='_blank' sx={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                <GitHub fontSize='small'/> SunTrack
              </Box>
            </FooterSubtitle>
          </Box>

          <Box>
            <FooterTitle text='Прочее'/>
            <FooterSubtitle>
              © {new Date().getFullYear()} Palettify. Все права защищены.
            </FooterSubtitle>
          </Box>

        </Box>
      </Container>
    </Box>
  );
};

const FooterTitle = ({text}) => {
  return (
    <Typography variant="h6" sx={{mb: 2}}>
      {text}
    </Typography>
  )
}
const FooterSubtitle = ({children}) => {
  return (
    <Typography variant="body2">
      {children}
    </Typography>
  )
}


export default Footer;