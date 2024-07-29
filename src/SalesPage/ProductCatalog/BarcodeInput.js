import React from 'react';
import { TextField, IconButton, InputAdornment } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useKeyboardContext } from '../../contexts/KeyboardContext';

const BarcodeInput = ({ theme, t, onChange }) => {
  const { handleClear } = useKeyboardContext();

  return (
    <TextField
      id="barcode"
      placeholder={t('Enter Barcode...')}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
      variant="outlined"
      sx={{
        input: { cursor: "pointer", color: theme === 'dark' ? 'white' : 'black'},
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: theme === 'dark' ? 'red' : 'default',
          },
          '&:hover fieldset': {
            borderColor: theme === 'dark' ? 'red' : 'default',
          },
          '&.Mui-focused fieldset': {
            borderColor: theme === 'dark' ? 'red' : 'default',
          },
        },
      }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleClear} style={{ color: "#dc143c" }}>
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      InputLabelProps={{
        style: { color: "#dc143c" },
      }}
    />
  );
};

export default BarcodeInput;
