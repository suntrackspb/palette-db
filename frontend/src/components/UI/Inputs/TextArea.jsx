import {TextField} from "@mui/material";

const TextArea = ({value, onChange, label, required}) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      label={label}
      multiline
      rows={4}
      variant='outlined'
      required={required}
      sx={{width: '100%'}}
    />
  );
};

export default TextArea;