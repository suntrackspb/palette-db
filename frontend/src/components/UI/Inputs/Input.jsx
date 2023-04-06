import {FormControl, FormHelperText, InputLabel, OutlinedInput} from "@mui/material";

const Input = ({
  value,
  onChange,
  label,
  id,
  type,
  required,
  autoFocus,
  error,
  errorMessage
}) => {
  return (
    <FormControl sx={{width: '100%'}} required={required}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        id={id}
        label={label}
        type={type}
        error={error}
      />
      <FormHelperText id={id} sx={{color: '#f44336'}}>
        {errorMessage}
      </FormHelperText>
    </FormControl>
  );
};

export default Input;