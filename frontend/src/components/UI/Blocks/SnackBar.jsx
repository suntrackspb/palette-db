import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="standard" {...props} />;
});

const SnackBar = ({text, open, setOpen}) => {
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%', position: 'absolute' }}>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {text}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
export default SnackBar