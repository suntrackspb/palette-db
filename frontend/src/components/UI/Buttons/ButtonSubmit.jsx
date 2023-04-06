import {Button, Typography} from "@mui/material";

const ButtonSubmit = ({disabled, text, px}) => {
  return (
    <Button
      type='submit'
      variant='contained'
      color='secondary'
      sx={{px: px ?? 4}}
      disabled={disabled}
    >
      <Typography component='span'>
        {text}
      </Typography>
    </Button>
  );
};

export default ButtonSubmit;