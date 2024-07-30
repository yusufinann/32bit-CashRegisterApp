import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLogin } from '../contexts/LoginContext';
//import { useStoreStatus } from '../contexts/StoreStatusContext';

const PrivateRoute = ({ element: Component, path, ...rest }) => {
  const { isLoggedIn } = useLogin();
 // const { isOnline } = useStoreStatus();

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  // if (!isOnline && (path === '/sales')) {
  //   return <Navigate to="/home" />;
  // }

  return <Component {...rest} />;
};

export default PrivateRoute;
