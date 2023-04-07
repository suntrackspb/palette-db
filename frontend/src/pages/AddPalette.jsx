import Cropper from "../modules/Cropper/Cropper.jsx";
import {Box} from "@mui/material";
import {useAuth} from "../hooks";
import {PageTitle} from "../components/UI";

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