import {Button, Typography} from "@mui/material";

const ButtonSubmit = ({disabled, text, width}) => {
  return (
    <Button
      type='submit'
      variant='contained'
      color='secondary'
      sx={{width}}
      disabled={disabled}
    >
      <Typography component='span'>
        {text}
      </Typography>
    </Button>
  );
};

export default ButtonSubmit;