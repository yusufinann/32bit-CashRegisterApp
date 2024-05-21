import React, { useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Container,
  CssBaseline,
  Avatar,
  Box,
  IconButton,
  InputAdornment,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff, Keyboard } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLogin } from '../contexts/LoginContext';
import { getVersion } from '../services/versionService';

const theme = createTheme();

const Login = () => {
  const { isLoggedIn, showError, login} = useLogin();
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const version = getVersion();

  const handleLogin = (event) => {
    event.preventDefault();
    login(usernameInputRef.current.value, passwordInputRef.current.value);
  };


  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <form onSubmit={handleLogin}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              backgroundColor: '#f0f0f0',
              color: '#333',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#ff4081' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: '#333' }}>
              Login
            </Typography>
            <TextField
            id="username"
              variant="outlined"
              margin="normal"
              required
              fullWidth              
              placeholder='username'
              name="username"
              autoFocus
              inputRef={usernameInputRef}
              autoComplete="username"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton  name="username">
                      <Keyboard />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
         

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              placeholder='password'
              type={showPassword ? 'text' : 'password'}
              inputRef={passwordInputRef}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} name="password">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                    <IconButton name="password">
                      <Keyboard />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {showError && (
              <Typography variant="body2" color="error">
                Invalid username or password
              </Typography>
            )}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2, backgroundColor: '#ff4081' }}
            >
              Login
            </Button>
            {version && (
              <Typography variant="body2">
                Version: {version}
              </Typography>
            )}
          </Box>
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
