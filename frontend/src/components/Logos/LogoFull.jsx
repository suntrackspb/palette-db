import logo from '../../images/logos/full.svg'
import {Box} from "@mui/material";
const LogoFull = ({...props}) => {
  return (
    <Box
      {...props}
      component='img'
      src={logo}
      alt='Логотип'
    />
  );
};

export default LogoFull;