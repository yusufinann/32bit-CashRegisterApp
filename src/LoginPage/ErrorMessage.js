import React from 'react';
import { Typography } from '@mui/material';

const ErrorMessage = ({ t }) => (
  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
    {t('Invalid username or password')}
  </Typography>
);

export default ErrorMessage;
