import React from 'react';
import {Button, Typography} from "@mui/material";

const ButtonSubmit = ({disabled, text}) => {
  return (
    <Button
      type='submit'
      variant='contained'
      color='secondary'
      sx={{px: 4}}
      disabled={disabled}
    >
      <Typography component='span'>
        {text}
      </Typography>
    </Button>
  );
};

export default ButtonSubmit;