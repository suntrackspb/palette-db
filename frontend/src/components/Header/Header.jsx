import {useEffect} from "react";
import {observer} from "mobx-react-lite";
import {AppBar, Box, Button, Container, Typography} from "@mui/material";
import useAuth from "../../hooks/useAuth.js";
import {getCookie} from "../../utils/cookie.js";
import LinkButton from "../LinkButton/LinkButton.jsx";
import {styles} from "./styles.js";


const Header = () => {
  const {store} = useAuth()
  const links = [
    {
      path: 'palettes',
      text: 'Палитры',
      isPrivate: false
    },
    {
      path: 'palette/add',
      text: 'Создать палитру',
      isPrivate: true
    },
    {
      path: 'palette/favorites',
      text: 'Избранное',
      isPrivate: true
    },
    {
      path: `user/${store.user?._id}`,
      text: 'Профиль',
      isPrivate: true
    }
  ]

  useEffect(() => {
    if (getCookie('csrf_access_token')) {
      store.checkAuth()
    }
  }, []);

  return (
    <AppBar position='static' sx={styles.appBar}>
      <Container maxWidth='xl' sx={styles.container}>

        <a href='/'>
          <Typography variant='h5' component='h1'>
            Palette Picker
          </Typography>
        </a>

        <Box component='ul' sx={styles.rightBlock}>

          {links.map(({path, text, isPrivate}, i) =>
            !isPrivate && <LinkButton
              key={i}
              component='li'
              linkTo={path}
              text={text}
              padding='6px 8px'
            />)}

          {store.isAuth && links.map(({path, text, isPrivate}, i) =>
            isPrivate && <LinkButton
              key={i}
              component='li'
              linkTo={path}
              text={text}
              padding='6px 8px'
            />)}

          {!store.isAuth
            ? <LinkButton
              component='li'
              linkTo='login'
              text='Вход'
              padding='6px 8px'
            />
            : <Button onClick={store.logout}>
              <Typography variant='span'>
                Выход
              </Typography>
            </Button>}

        </Box>
      </Container>
    </AppBar>
  );
};

export default observer(Header);