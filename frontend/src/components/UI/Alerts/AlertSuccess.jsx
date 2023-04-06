import React from 'react';
import {Alert} from "@mui/material";

const AlertSuccess = ({text}) => {
  return (
    <Alert sx={{whiteSpace: 'pre-wrap', alignItems: 'center'}} variant='outlined' severity="success">{text}</Alert>
  );
};

export default AlertSuccess;