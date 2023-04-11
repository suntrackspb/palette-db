import logo from '../../logo.svg'
import {Box} from "@mui/material";
const Logo = ({...props}) => {
  return (
    <Box
      {...props}
      component='img'
      src={logo}
      alt='Логотип'
    />
  );
};

export default Logo;