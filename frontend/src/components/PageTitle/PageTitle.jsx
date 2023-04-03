import React from 'react';
import {Typography} from "@mui/material";

const PageTitle = ({title, ...props}) => {
  return (
    <Typography
      variant='h4'
      component='h2'
      textAlign='center'
      my={2}
      {...props}
    >
      {title}
    </Typography>
  );
};

export default PageTitle;