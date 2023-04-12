import logo from '../../images/logos/name_slogan.svg'
import {Box} from "@mui/material";
const LogoTextSlogan = ({...props}) => {
  return (
    <Box
      {...props}
      component='img'
      src={logo}
      alt='Логотип'
    />
  );
};

export default LogoTextSlogan;