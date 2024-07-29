import React from 'react';
import { Box, Typography, Avatar, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import UsernameField from './UsernameField';
import PasswordField from './PasswordField';
import ErrorMessage from './ErrorMessage';

const LoginForm = ({
  usernameInputRef,
  passwordInputRef,
  showPassword,
  setShowPassword,
  handleLogin,
  showError,
  t,
  theme,
}) => (
  <Box
    component="form"
    onSubmit={handleLogin}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: theme === 'dark' ? 'black' : '#fff',
      padding: 4,
      borderRadius: 2,
      boxShadow: 3,
      width: '100%',
    }}
  >
    <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      {t('Login')}
    </Typography>
    <UsernameField usernameInputRef={usernameInputRef} t={t} />
    <PasswordField
      passwordInputRef={passwordInputRef}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      t={t}
    />
    {showError && <ErrorMessage t={t} />}
    <Button fullWidth type="submit" variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
      {t('Login')}
    </Button>
  </Box>
);

export default LoginForm;
