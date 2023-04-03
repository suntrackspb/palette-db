import React from 'react';
import {Box, Fade, Popper, Typography} from "@mui/material";
import {styles} from "../../modules/PaletteInfo/components/ColorItem/styles.js";

const CopyBlock = ({copyId, isCopyOpen, copyAnchor}) => {
  return (
    <Popper id={copyId} open={isCopyOpen} anchorEl={copyAnchor} transition placement='top'>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Box sx={styles.popperCopy}>
            <Typography>Copied</Typography>
          </Box>
        </Fade>
      )}
    </Popper>
  );
};

export default CopyBlock;