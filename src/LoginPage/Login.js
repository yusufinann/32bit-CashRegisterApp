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
import { getVersion } from '../services/versionService'; // Import the getVersion function
import { useGlobalContext } from '../contexts/GlobalContext';
import VirtualKeyboard from '../GlobalComponents/VirtualKeyboard';

const theme = createTheme();

const Login = () => {
  const { isLoggedIn, showError, login } = useLogin();
  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const { setIsKeyboardOpen } = useGlobalContext();
  const [inputTarget, setInputTarget] = useState(null);

  const version = getVersion();

  const [inputUser, setInputUser] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [keyboardPosition, setKeyboardPosition] = useState({ x: 0, y: 0 });

  const handleLogin = (event) => {
    event.preventDefault();
    login(usernameInputRef.current.value, passwordInputRef.current.value);
  };

  const handleInputClick = (event) => {
    const inputName = event.target.name;
    setInputTarget(inputName);
    if (inputName === 'username' || inputName === 'password') {
      setIsKeyboardOpen(true);
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      setKeyboardPosition({ x: (screenWidth - 800) / 2, y: (screenHeight - 800) / 2 });
    }
  };

const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  const handleVirtualKeyboardPressUser = (value) => {
    setInputUser(value);
  };

  const handleVirtualKeyboardPressPassword = (value) => {
    setInputPassword(value);
  };

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
            value={inputUser}
            onClick={handleInputClick}
            onChange={(e) => setInputUser(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            inputRef={usernameInputRef}
            autoComplete="username"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleInputClick}  name="username">
                    <Keyboard />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {inputTarget === 'username' && (
              <VirtualKeyboard
                inputValue={inputUser}
                onInputChange={setInputUser}
                KeyboardPress={handleVirtualKeyboardPressUser}
                position={keyboardPosition}
              />
            )}
          <TextField
          value={inputPassword}
          onClick={handleInputClick}
          onChange={(e) => setInputPassword(e.target.value)}
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
                  <IconButton onClick={handleInputClick} name="password">
                    <Keyboard />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {inputTarget === 'password' && (
              <VirtualKeyboard
                inputValue={inputPassword}
                onInputChange={setInputPassword}
                KeyboardPress={handleVirtualKeyboardPressPassword}
                position={keyboardPosition}
              />
            )}

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
        </form>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
