
import {Box, Paper, Typography} from "@mui/material";
import {rgbaToHexText, rgbaToText} from "../utils/colorsFunctions.js";
import {useDarkness, useLightness} from "../hooks/useColors.js";
import PaletteInfo from "../modules/PaletteInfo/PaletteInfo";

const data = {
  colors: ["#220800", "#94516a", "#d09c97", "#e7d8d2", "#f4f3f1"],
  id: '63fa7a2856f94e88db1b91be',
  imageUrl: 'https://pp.plutonium-dayz.ru/images/palette-1620.jpg',
  name: 'palette-1620',
  tags: ['color']
}



const testPage = () => {
  // const color = {r: 34, g: 8, b: 0, a: 1}
  // const color = {r: 244, g: 243, b: 241, a: 1}
  const color = {r: 157, g: 34, b: 53, a: 1}
  const lightArr = useLightness(color, 10, 10)
  const darkArr = useDarkness(color, 10, 10)
  console.log(lightArr)
  console.log(darkArr)
  const styles = {
    box: {
      width: '100px',
      height: '100px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrapper: {
      display: 'flex',
      gap: '10px'
    }
  }
  return (
    <div>
      <PaletteInfo data={data}/>
    </div>
  );
};

export default testPage;