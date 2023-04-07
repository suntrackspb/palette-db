import {Box, Paper, Typography} from "@mui/material";
import {rgbaToHexText, rgbaToText} from "../../../../utils/colorsFunctions.js";
import {styles} from './styles.js'
import {useCopy} from "../../../../hooks";
import {CopyBlock} from "../../../../components/UI";
const GradientLine = ({colorsArr}) => {
  const {copyAnchor, copyId, isCopyOpen, copyColor} = useCopy('copy-tone')
  return (
    <>
      {colorsArr.map((color, i) =>
        <Box key={i}>
          <Paper sx={{bgcolor: rgbaToText(color), ...styles.box}}/>
          <Typography
            color='#fff'
            textAlign='center'
            mt={1}
            aria-describedby={copyId}
            onClick={copyColor}
            sx={{cursor: 'pointer'}}
          >
            {rgbaToHexText(color).toUpperCase()}
          </Typography>

          <CopyBlock
            copyId={copyId}
            copyAnchor={copyAnchor}
            isCopyOpen={isCopyOpen}
          />
        </Box>)}
    </>
  );
};

export default GradientLine;