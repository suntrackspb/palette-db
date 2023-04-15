import React, {useState} from 'react';
import {Box, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import {useAuth} from "../../hooks";


const BurgerMenu = ({menuOptions}) => {
  const {store} = useAuth()
  const [anchorElNav, setAnchorElNav] = useState(null);
  const handleOpenNavMenu = (e) => {
    setAnchorElNav(e.currentTarget)
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  };
  return (
    <Box sx={{display: {xs: 'flex', md: 'none'}}}>
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
        {menuOptions.map(({path, text, isPrivate}, i) =>
          !isPrivate && <MenuLink key={i} linkTo={path} text={text} onClick={handleCloseNavMenu}/>)}

        {store.isAuth && menuOptions.map(({path, text, isPrivate}, i) =>
          isPrivate && <MenuLink key={i} linkTo={path} text={text} onClick={handleCloseNavMenu}/>)}

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
  );
};
const MenuLink = ({onClick, linkTo, text}) => {
  return <MenuItem onClick={onClick} sx={{p: 0}}>
    <Link to={linkTo} style={{width: '100%', padding: '6px 16px'}}>
      <Typography component='span'>{text}</Typography>
    </Link>
  </MenuItem>
}
export default BurgerMenu;