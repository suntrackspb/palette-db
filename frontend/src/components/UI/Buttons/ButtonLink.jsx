import {Button, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const LinkButton = ({component, variant, color, text, linkTo, padding, sx}) => {
  return (
    <Button
      component={component}
      variant={variant}
      color={color}
      sx={{p: 0, ...sx}}
    >
      <Link to={linkTo} style={{padding}}>
        <Typography variant='span'>
          {text}
        </Typography>
      </Link>
    </Button>
  );
};

export default LinkButton;