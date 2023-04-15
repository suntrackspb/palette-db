import {useState} from 'react';
import {Avatar, Box, Button, IconButton, Menu, MenuItem, Tooltip, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/"

const UserMenu = ({menuOptions, avatar}) => {
  const {store} = useAuth()
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = e => {
    setAnchorElUser(e.currentTarget);
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  }
  return (
    <Box sx={{ flexGrow: 0, display: {xs: 'none', md: 'flex'} }}>
      <Tooltip title="Открыть меню">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar sx={{
            bgcolor: store.userColor,
            color: '#fff',
            '& .MuiSvgIcon-root': {
              width: '60%'
            }
          }} alt="Аватарка" src={avatar} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {menuOptions.map(({path, text}, i) => (
          <MenuItem key={i} onClick={handleCloseUserMenu} sx={{p: 0}}>
            <Link to={path} style={{width: '100%', padding: '6px 16px'}}>
              <Typography component='span'>{text}</Typography>
            </Link>
          </MenuItem>
        ))}
        <MenuItem onClick={handleCloseUserMenu} sx={{p: 0}}>
            <Typography component='span' onClick={store.logout} sx={{p: '6px 16px', width: '100%'}}>
              Выйти
            </Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default UserMenu;