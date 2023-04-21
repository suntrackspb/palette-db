import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {AppBar, Box, Container} from "@mui/material";
import {useAuth} from "../../hooks";
import {getCookie} from "../../utils/cookie.js";
import {ButtonLink} from "../UI";

import {styles} from "./styles.js";
import PaletteService from "../../api/PaletteService.js";
import HeaderSearch from "./HeaderSearch.jsx";
import Logo from "../Logos/Logo.jsx";
import UserMenu from "./UserMenu.jsx";
import BurgerMenu from "./BurgerMenu.jsx";
import {colorsArr} from "../../consts/index.js";
import {Link} from "react-router-dom";


const Header = () => {
  const [tags, setTags] = useState([]);
  const {store} = useAuth()
  const links = [
    {
      path: '/',
      text: 'Главная',
      isPrivate: false
    },
    {
      path: 'palettes',
      text: 'Палитры',
      isPrivate: false
    },
    {
      path: 'feedback',
      text: 'Контакты',
      isPrivate: false
    },
    {
      path: 'palette/add',
      text: 'Создать',
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
      store.setUserColor(colorsArr[Math.floor(Math.random() * colorsArr.length)])
    }
    if (!localStorage.getItem('tags')) {
      PaletteService.getTags()
        .then(res => {
          localStorage.setItem('tags', JSON.stringify(res))
          setTags(res)
        })
    } else {
      setTags(JSON.parse(localStorage.getItem('tags')))
    }
  }, []);

  return (
    <AppBar position='static' sx={styles.appBar}>
      <Container maxWidth='xl' sx={styles.container}>

        <Link to='/'>
          <Logo sx={{width: '45px'}}/>
        </Link>

        <Box sx={styles.publicLinks}>
          {links.map(({path, text, isPrivate}, i) =>
            !isPrivate && <ButtonLink
              key={i}
              linkTo={path}
              text={text}
              padding='6px 8px'
            />)}
        </Box>

        <HeaderSearch sx={{ml: 'auto'}} tags={tags}/>

        {!store.isAuth &&
          <ButtonLink
            linkTo='login'
            text='Войти'
            padding='6px 8px'
            sx={{display: {xs: 'none', md: 'inline-flex'}}}
          />}

        {store.isAuth &&
          <UserMenu
            menuOptions={links.filter(link => link.isPrivate)}
            avatar={store.user.avatar}
          />}

        <BurgerMenu menuOptions={links}/>

      </Container>
    </AppBar>
  );
};

export default observer(Header);