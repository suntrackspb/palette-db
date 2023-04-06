import {useState} from "react";

import {Box, IconButton, ListItem, Popover, Popper, Typography} from "@mui/material"
import UndoIcon from '@mui/icons-material/Undo'
import {ChromePicker} from "react-color";

import usePopover from "../../../../hooks/usePopover.js";
import {hexToRgba, rgbaToHexText, rgbaToText} from "../../../../utils/colorsFunctions.js";

import {styles} from './styles.js'
import {CopyBlock} from "../../../../components/UI";
import useCopy from "../../../../hooks/useCopy.js";

const ColorItem = ({itemColor, setSelectedColor}) => {
  const [color, setColor] = useState(() => hexToRgba(itemColor))
  const [pickerAnchor, pickerId, isPickerOpen, showPicker, hidePicker] = usePopover('picker')
  const {copyAnchor, copyId, isCopyOpen, copyColor} = useCopy('copy-color')

  const handlePickerClick = e => {
    showPicker(e)
    setSelectedColor(color)
  }
  const handlePickerChange = color => {
    setColor(color.rgb)
    setSelectedColor(color.rgb)
  }
  const handleUndoColor = () => {
    if (itemColor.toLowerCase() !== rgbaToHexText(color).toLowerCase()) {
      setColor(hexToRgba(itemColor))
      setSelectedColor(hexToRgba(itemColor))
    }
  }

  return (
    <ListItem sx={styles.listItem}>
      <Box
        sx={{bgcolor: rgbaToText(color), ...styles.colorBox}}
        aria-describedby={pickerId}
        onClick={handlePickerClick}
      />

      <Box sx={{width: '225px'}} >
        <Typography
          sx={styles.code}
          onClick={copyColor}
          aria-describedby={copyId}
          noWrap
        >
          {rgbaToHexText(color).toUpperCase()}
        </Typography>

        <Typography
          sx={styles.code}
          onClick={copyColor}
          aria-describedby={copyId}
          noWrap
        >
          {rgbaToText(color).toUpperCase()}
        </Typography>
      </Box>

      <Box mx='4px'>
        <IconButton
          sx={styles.undoIconBtn}
          onClick={handleUndoColor}
        >
          <UndoIcon
            sx={styles.undoIcon}
          />
        </IconButton>
      </Box>

      <Popover
        id={pickerId}
        open={isPickerOpen}
        onClose={hidePicker}
        anchorEl={pickerAnchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 250,
        }}
      >
        <ChromePicker
          color={color}
          onChange={handlePickerChange}
        />
      </Popover>

      <CopyBlock
        copyId={copyId}
        isCopyOpen={isCopyOpen}
        copyAnchor={copyAnchor}
      />


    </ListItem>
  );
};

export default ColorItem;