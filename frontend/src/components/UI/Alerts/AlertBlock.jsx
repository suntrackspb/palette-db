import React from 'react';
import {Alert} from "@mui/material";

const AlertBlock = ({text, width, type}) => {
  return (
    <Alert
      sx={{
        whiteSpace: 'pre-wrap',
        alignItems: 'center',
        justifyContent: 'center',
        width
    }}
      variant='outlined'
      severity={type}
    >
      {text}
    </Alert>
  );
};

export default AlertBlock;