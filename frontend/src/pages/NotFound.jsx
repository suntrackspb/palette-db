import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import {Box, Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";
const NotFound = () => {
  return (
    <Box textAlign='center' my={10}>
      <Typography sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px'}} component='h1' variant='h4'>
        <SentimentVeryDissatisfiedIcon fontSize='26px'/> 404 Page Not Found
      </Typography>
      <Link to='/'>
        <Button
          variant='outlined'
          sx={{
            color: '#fff',
            border: '1px solid #fff',
            marginTop: '10px',
            '&:hover': {
              border: '1px solid #858585',
            }
        }}>
          Go home
        </Button>
      </Link>
    </Box>
  );
};

export default NotFound;