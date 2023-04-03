import {useEffect} from "react";
import {AppBar, Box, Button, Container, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {getCookie} from "../../utils/cookie.js";
import {observer} from "mobx-react-lite";
import useAuth from "../../hooks/useAuth.js";

const links = [
  {
    path: 'palette/add',
    text: 'Add palette'
  },
  {
    path: 'login',
    text: 'Login'
  },
]

const Header = () => {
  const {store} = useAuth()

  useEffect(() => {
    if (getCookie('csrf_access_token')) {
      store.checkAuth()
    }
  }, []);

  return (
    <AppBar position='static' sx={{padding: 2, bgcolor: 'header.main', backgroundImage: 'none'}}>
      <Container maxWidth='xl' sx={{display: 'flex', gap: '10px', alignItems: 'center'}}>
        <a href='/'>
          <Typography variant='h5' component='h1'>
            Palette Picker
          </Typography>
        </a>
        <Box sx={{marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '10px'}}>

          {store.isAuth &&
            <>
              <Link to='palette/add'>
                <Button>
                  <Typography variant='p' component='span'>
                    Add palette
                  </Typography>
                </Button>
              </Link>

              <Link to='palette/favorites'>
                <Button>
                  <Typography variant='p' component='span'>
                    Favorite
                  </Typography>
                </Button>
              </Link>

              <Link to={`user/${store.user?._id}`}>
                <Button>
                  <Typography variant='p' component='span'>
                    Profile
                  </Typography>
                </Button>
              </Link>

              <Button onClick={() => store.logout()}>
                <Typography variant='p' component='span'>
                  Logout
                </Typography>
              </Button>
            </>
          }

          {!store.isAuth &&
            <Link to='/login'>
              <Button>
                <Typography variant='p' component='span'>
                  Login
                </Typography>
              </Button>
            </Link>
          }


        </Box>
      </Container>
    </AppBar>
  );
};

export default observer(Header);