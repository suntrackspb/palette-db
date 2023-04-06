import {FormControl, InputLabel, OutlinedInput} from "@mui/material";

const Input = ({value, onChange, label, id, type, required}) => {
  return (
    <FormControl variant='outlined' sx={{width: '100%'}} required={required}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        value={value}
        onChange={onChange}
        id={id}
        label={label}
        type={type}
        autoComplete='off'
      />
    </FormControl>
  );
};

export default Input;