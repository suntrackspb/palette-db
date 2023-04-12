import logo from '../../images/logos/name.svg'
import {Box} from "@mui/material";
const LogoText = ({...props}) => {
  return (
    <Box
      {...props}
      component='img'
      src={logo}
      alt='Логотип'
    />
  );
};

export default LogoText;