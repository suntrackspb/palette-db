import {useState} from "react";
import {Box} from "@mui/material";

import ColorsList from "./components/ColorsList/ColorsList.jsx";
import Gradient from "./components/Gradient/Gradient.jsx";

import {ContentBlock} from "../../components/UI/index";
import TagsList from "./components/TagsList/TagsList.jsx";
import HeaderInfo from "./components/HeaderInfo/HeaderInfo.jsx";




const PaletteInfo = ({data}) => {
  const [selectedColor, setSelectedColor] = useState({});

  return (
    <Box className='flex-col' sx={{gap: 2}}>
      <ContentBlock className='flex-col' styleProps={{mt: 2, position: 'relative'}}>
        <HeaderInfo data={data} />
      </ContentBlock>

      <Box display='flex' gap={2} flexDirection={{xs: 'column', sm: 'column', md: 'row'}}>
        <ContentBlock styleProps={{flex: 1}}>
          <img style={{maxWidth: '400px'}} src={data.src} alt="palette"/>
        </ContentBlock>

        <ContentBlock styleProps={{flex: 1}}>
          <ColorsList colors={data.colors} setSelectedColor={setSelectedColor}/>
        </ContentBlock>
      </Box>

      <ContentBlock styleProps={{flexDirection: 'column', display: {xs: 'none', md: 'flex'}}}>
        <Gradient selectedColor={selectedColor}/>
      </ContentBlock>

      <ContentBlock>
        <TagsList tags={data.tags}/>
      </ContentBlock>
    </Box>
  );
};



export default PaletteInfo;