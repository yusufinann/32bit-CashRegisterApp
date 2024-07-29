import React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Keyboard } from '@mui/icons-material';

const UsernameField = ({ usernameInputRef, t }) => (
  <TextField
    id="username"
    variant="outlined"
    margin="normal"
    required
    fullWidth
    placeholder={t('username')}
    name="username"
    autoFocus
    inputRef={usernameInputRef}
    autoComplete="username"
    InputProps={{
      endAdornment: (
        <InputAdornment position="end">
          <IconButton>
            <Keyboard />
          </IconButton>
        </InputAdornment>
      ),
    }}
  />
);

export default UsernameField;
