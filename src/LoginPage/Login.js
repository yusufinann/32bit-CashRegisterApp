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
  Paper,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff, Keyboard } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLogin } from '../contexts/LoginContext';
import { getVersion } from '../services/versionService';
import ShopStatus from '../ShopStatus';

const theme = createTheme({
  palette: {
    primary: {
      main: '#6200ea',
    },
    secondary: {
      main: '#03dac6',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          backgroundColor: '#fff',
        },
      },
    },
  },
});

const Login = () => {
  const { isLoggedIn, showError, login } = useLogin();
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const version = getVersion();

  const handleLogin = (event) => {
    event.preventDefault();
    login(usernameInputRef.current.value, passwordInputRef.current.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <ThemeProvider theme={theme}>
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
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: 3,
            }}
          >
            <ShopStatus />
          </Paper>
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#fff',
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
              Login
            </Typography>
            <TextField
              id="username"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              placeholder="Username"
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="password"
              placeholder="Password"
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
            {showError && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                Invalid username or password
              </Typography>
            )}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            {version && (
              <Typography variant="body2" sx={{ mt: 2 }}>
                Version: {version}
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
