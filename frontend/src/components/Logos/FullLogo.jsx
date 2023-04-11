import logo from '../../full-logo.svg'
import {Box} from "@mui/material";
const FullLogo = ({...props}) => {
  return (
    <Box
      {...props}
      component='img'
      src={logo}
      alt='Логотип'
    />
  );
};

export default FullLogo;