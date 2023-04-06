import {TextField} from "@mui/material";

const TextArea = ({value, onChange, label, required, fullWidth}) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      label={label}
      multiline
      rows={4}
      variant='outlined'
      required={required}
      fullWidth={fullWidth}
    />
  );
};

export default TextArea;