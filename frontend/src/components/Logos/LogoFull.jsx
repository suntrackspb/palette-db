import logo from '../../assets/images/logos/full.svg'
import {Box} from "@mui/material";
const LogoFull = ({...props}) => {
  return (
    <Box
      {...props}
      component='img'
      width='100%'
      src={logo}
      alt='Логотип'
    />
  );
};

export default LogoFull;