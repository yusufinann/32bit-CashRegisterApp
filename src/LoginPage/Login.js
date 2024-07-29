import React, { useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  Container,
  CssBaseline,
  Box,
  Paper,
  Typography,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useLogin } from '../contexts/LoginContext';
import { getVersion } from '../services/versionService';
import ShopStatus from '../ShopStatus';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { themee } from './theme';
import LoginForm from './LoginForm';

const Login = () => {
  const { isLoggedIn, showError, login } = useLogin();
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const version = getVersion();
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleLogin = (event) => {
    event.preventDefault();
    login(usernameInputRef.current.value, passwordInputRef.current.value);
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <ThemeProvider theme={themee}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            position: 'relative',
          }}
        >
          <Paper
            sx={{
              position: 'absolute',
              top: 16,
              left: 16,
              padding: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme === 'dark' ? 'black' : '#fff',
              color: theme === 'dark' ? 'white' : '#fff',
              borderRadius: '8px',
              boxShadow: 3,
            }}
          >
            <ShopStatus t={t} />
          </Paper>
          <LoginForm
            usernameInputRef={usernameInputRef}
            passwordInputRef={passwordInputRef}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handleLogin={handleLogin}
            showError={showError}
            t={t}
            theme={theme}
          />
              {version && (
              <Typography variant="body2" sx={{ mt: 2 }}>
                {t('Version')}: {version}
              </Typography>
            )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
