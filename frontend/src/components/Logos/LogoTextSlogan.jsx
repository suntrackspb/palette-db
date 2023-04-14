import logo from '../../assets/images/logos/name_slogan.svg'
import {Box} from "@mui/material";
const LogoTextSlogan = ({...props}) => {
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

export default LogoTextSlogan;