import React, {useState} from 'react';
import {FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

const InputPassword = ({
  value,
  onChange,
  label,
  id,
  required,
  autoFocus,
  error,
  errorMessage,
  fullWidth
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(prev => !prev);
  return (
    <FormControl fullWidth={fullWidth} required={required}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        value={value}
        onChange={onChange}
        id={id}
        type={showPassword ? 'text' : 'password'}
        label={label}
        error={error}
        autoFocus={autoFocus}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="Показать/скрыть пароль"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff/> : <Visibility/>}
            </IconButton>
          </InputAdornment>}
      />
      <FormHelperText id="outlined-password" sx={{color: '#f44336'}}>
        {errorMessage}
      </FormHelperText>
    </FormControl>
  );
};

export default InputPassword;