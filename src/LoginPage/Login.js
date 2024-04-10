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
  Modal,
  Paper,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Visibility, VisibilityOff, Keyboard } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useLogin } from '../contexts/LoginContext';
import { getVersion } from '../services/versionService'; // Import the getVersion function

const theme = createTheme();

const Login = () => {
  const { isLoggedIn, showError, login } = useLogin();
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const version = getVersion();

  const handleLogin = () => {
    login(usernameInputRef.current.value, passwordInputRef.current.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const openKeyboard = () => {
    setIsKeyboardOpen(true);
  };

  const closeKeyboard = () => {
    setIsKeyboardOpen(false);
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
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            inputRef={usernameInputRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={openKeyboard}>
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
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            inputRef={passwordInputRef}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                  <IconButton onClick={openKeyboard}>
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
            variant="contained"
            color="primary"
            onClick={handleLogin}
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
      </Container>
      <Modal
        open={isKeyboardOpen}
        onClose={closeKeyboard}
        aria-labelledby="keyboard-modal-title"
        aria-describedby="keyboard-modal-description"
      >
        <Paper
          style={{
            position: 'absolute',
            width: 400,
            backgroundColor: '#fff',
            padding: 20,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
          }}
        >
          <Typography id="keyboard-modal-title" variant="h6" component="div">
            Virtual Keyboard
          </Typography>
        </Paper>
      </Modal>
    </ThemeProvider>
  );
};

export default Login;
