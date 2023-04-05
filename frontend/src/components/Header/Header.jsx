import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import useAuth from "../../hooks/useAuth.js";
import {getCookie} from "../../utils/cookie.js";
import LinkButton from "../LinkButton/LinkButton.jsx";
import {styles} from "./styles.js";
import {Link} from "react-router-dom";


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

  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


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
              text='Войти'
              padding='6px 8px'
            />
            : <Button onClick={store.logout}>
              <Typography variant='span'>
                Выйти
              </Typography>
            </Button>}

        </Box>

        <Box sx={{display: {xs: 'flex', md: 'none'}, ml: 'auto'}}>
          <IconButton
            size="large"
            onClick={handleOpenNavMenu}
            color="primary"
          >
            <MenuIcon/>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: {xs: 'flex', md: 'none'},
            }}
          >
            {links.map(({path, text, isPrivate}, i) =>
              !isPrivate && <MenuLink key={i} linkTo={path} text={text}/>)}

            {store.isAuth && links.map(({path, text, isPrivate}, i) =>
              isPrivate && <MenuLink key={i} linkTo={path} text={text}/>)}

            {!store.isAuth
              ? <MenuLink linkTo='login' text='Войти' onClick={handleCloseNavMenu}/>
              : <MenuItem onClick={() => {
                store.logout()
                handleCloseNavMenu()
              }}>
                <Typography textAlign="center">Выйти</Typography>
              </MenuItem>}
          </Menu>
        </Box>
      </Container>
    </AppBar>
  );
};

const MenuLink = ({onClick, linkTo, text}) => {
  return <MenuItem onClick={onClick}>
    <Link to={linkTo}>
      <Typography textAlign="center">{text}</Typography>
    </Link>
  </MenuItem>
}

export default observer(Header);