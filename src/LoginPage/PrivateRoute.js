import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLogin } from '../contexts/LoginContext';

const PrivateRoute = ({ element: Component }) => {
  const { isLoggedIn } = useLogin();

  return isLoggedIn ? <Component/> : null
};

export default PrivateRoute;
