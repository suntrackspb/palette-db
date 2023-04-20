import React from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from "@mui/material";

const ModalDialog = ({
  isOpen,
  handleClose,
  title,
  contentText,
  fullWidth,
  maxWidth,
  children,
  handleSubmit
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      sx={{
        '& .MuiPaper-root': {
          bgcolor: 'transparent',
          backdropFilter: 'blur(10px)'
        }
    }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {contentText &&
          <DialogContentText>
          {contentText}
        </DialogContentText>}
        {children}
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' color='error' onClick={handleClose}>Отмена</Button>
        <Button variant='outlined' color='success' onClick={handleSubmit}>Подтвердить</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDialog;