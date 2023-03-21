import {Backdrop, CircularProgress} from "@mui/material";

const Loader = ({isLoading}) => {
  return (
    <Backdrop
      sx={{color: 'text.primary', zIndex: (theme) => theme.zIndex.drawer + 1}}
      open={isLoading}
    >
      <CircularProgress color="inherit"/>
    </Backdrop>
  );
};

export default Loader;