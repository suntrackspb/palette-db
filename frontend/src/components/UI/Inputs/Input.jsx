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
  errorMessage,
  readOnly,
  onFocus,
  autoComplete,
  fullWidth
}) => {
  return (
    <FormControl fullWidth={fullWidth} required={required}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        value={value}
        onChange={onChange}
        autoFocus={autoFocus}
        id={id}
        label={label}
        type={type}
        error={error}
        readOnly={readOnly}
        onFocus={onFocus}
        autoComplete={autoComplete}
      />
      {error && <FormHelperText id={id} sx={{color: '#f44336'}}>
        {errorMessage}
      </FormHelperText>}
    </FormControl>
  );
};

export default Input;