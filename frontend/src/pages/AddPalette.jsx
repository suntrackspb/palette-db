import Cropper from "../modules/Cropper/Cropper.jsx";
import {Box} from "@mui/material";
import useAuth from "../hooks/useAuth.js";
import PageTitle from "../components/PageTitle/PageTitle.jsx";

const AddPalette = () => {
  const {store} = useAuth()

  return (
    <Box component='section' my={2}>
      <PageTitle title='Создать палитру'/>

      <Cropper store={store}/>
    </Box>
  );
};

export default AddPalette;