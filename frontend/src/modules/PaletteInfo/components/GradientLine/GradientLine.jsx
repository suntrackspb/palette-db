import {Box, Paper, Typography} from "@mui/material";
import {rgbaToHexText, rgbaToText} from "../../../../utils/colorsFunctions.js";
import {styles} from './styles.js'
const GradientLine = ({colorsArr}) => {
  return (
    <>
      {colorsArr.map((color, i) =>
        <Box key={i}>
          <Paper sx={{bgcolor: rgbaToText(color), ...styles.box}}/>
          <Typography color='#fff' textAlign='center' mt={1}>
            {rgbaToHexText(color).toUpperCase()}
          </Typography>
        </Box>)}
    </>
  );
};

export default GradientLine;