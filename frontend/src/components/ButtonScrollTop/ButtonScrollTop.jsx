import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {IconButton} from "@mui/material";

const ButtonScrollTop = ({visible}) => {

  return (
    <>
      {visible && <IconButton
        size="large"
        sx={{
          bgcolor: 'rgba(255,255,255,.3)',
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          border: '1px solid #dbdbdb',
          '&:hover': {
            bgcolor: 'rgba(255,255,255,.5)'
          }
        }}
        onClick={() => document.documentElement.scrollTop = 0}
      >
        <KeyboardArrowUpIcon fontSize="inherit"/>
      </IconButton>}
    </>
  );
};


export default ButtonScrollTop;