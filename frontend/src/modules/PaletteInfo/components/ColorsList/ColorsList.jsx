import {List} from "@mui/material";
import ColorItem from "../ColorItem/ColorItem.jsx";
import {styles} from './styles.js'
import {memo} from "react";
const ColorsList = memo(({colors, setSelectedColor}) => {
  return (
    <List sx={styles.colorsList}>
      {colors.map((color, i) =>
        <ColorItem key={i} itemColor={color} setSelectedColor={setSelectedColor} />
      )}
    </List>
  );
});

export default ColorsList;