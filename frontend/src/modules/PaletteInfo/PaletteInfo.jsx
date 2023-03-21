import {useState} from "react";
import {Box} from "@mui/material";

import ColorsList from "./components/ColorsList/ColorsList.jsx";
import Gradient from "./components/Gradient/Gradient.jsx";

import ContentBlock from "../../components/ContentBlock/ContentBlock.jsx";
import TagsList from "./components/TagsList/TagsList.jsx";
import HeaderInfo from "./components/HeaderInfo/HeaderInfo.jsx";




const PaletteEdit = ({data}) => {
  const [selectedColor, setSelectedColor] = useState({});

  return (
    <Box className='flex-col' sx={{gap: 2}}>
      <ContentBlock className='flex-col' styleProps={{mt: 2, position: 'relative'}}>
        <HeaderInfo data={data} />
      </ContentBlock>

      <Box display='flex' gap={2} flexDirection={{xs: 'column', sm: 'column', md: 'row'}}>
        <ContentBlock>
          <img style={{maxWidth: '400px'}} src={data.src} alt="palette"/>
        </ContentBlock>

        <ContentBlock>
          <ColorsList colors={data.colors} setSelectedColor={setSelectedColor}/>
        </ContentBlock>
      </Box>

      <ContentBlock styleProps={{flexDirection: 'column'}}>
        <Gradient selectedColor={selectedColor}/>
      </ContentBlock>

      <ContentBlock>
        <TagsList tags={data.tags}/>
      </ContentBlock>
    </Box>
  );
};



export default PaletteEdit;