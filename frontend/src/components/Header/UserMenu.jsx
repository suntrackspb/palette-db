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
    <Box sx={{ flexGrow: 0 }}>
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
          <MenuItem key={i} onClick={handleCloseUserMenu}>
            <Link to={path}>
              <Typography textAlign="center">{text}</Typography>
            </Link>
          </MenuItem>
        ))}
        <MenuItem onClick={handleCloseUserMenu}>
            <Typography variant='span' onClick={store.logout}>
              Выйти
            </Typography>
        </MenuItem>
      </Menu>
    </Box>
  )
}

export default UserMenu;