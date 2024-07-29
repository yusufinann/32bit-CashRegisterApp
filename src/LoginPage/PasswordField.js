import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Keyboard } from '@mui/icons-material';

const PasswordField = ({ passwordInputRef, showPassword, setShowPassword, t }) => {
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id="password"
      placeholder={t('Password')}
      type={showPassword ? 'text' : 'password'}
      inputRef={passwordInputRef}
      autoComplete="current-password"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={togglePasswordVisibility}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
            <IconButton>
              <Keyboard />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordField;
