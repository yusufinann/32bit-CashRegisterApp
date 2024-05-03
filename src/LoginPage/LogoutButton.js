import React from 'react';
import { IconButton ,styled,Box,Tooltip} from '@mui/material';
import { useLogin } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import {ExitToApp } from '@mui/icons-material';


const LogoutButton = () => {
  const {logout } = useLogin();

  const LogoutButtonContainer = styled(Box)({
    position: 'absolute',
    top: '5px',
    right: '5px',
});


  const navigate = useNavigate(); // useNavigate hook'unu kullanarak navigate fonksiyonunu alın

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <LogoutButtonContainer>
        <Tooltip title="Exit">
    <IconButton color="primary" onClick={handleLogout}>
        <ExitToApp sx={{ fontSize: '32px' }} />
    </IconButton>
    </Tooltip>
</LogoutButtonContainer>
  );
};

export default LogoutButton;
