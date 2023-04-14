import logo from '../../assets/images/logos/name.svg'
import {Box} from "@mui/material";
const LogoText = ({...props}) => {
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

export default LogoText;