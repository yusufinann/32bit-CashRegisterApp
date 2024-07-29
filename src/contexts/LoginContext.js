import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('isLoggedIn') === 'true';
  });
  const [showError, setShowError] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [allUsers, setAllUsers] = useState(null);

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseURL}/users`);
        setAllUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (!allUsers) {
      fetchUserData();
    }
  }, [allUsers, baseURL]);

  const login = (username, password) => {
    const foundUser = allUsers.find(user => user.username === username && user.password === password);

    if (foundUser) {
      const { password, username, ...userWithoutSensitiveInfo } = foundUser;
      setIsLoggedIn(true);
      setShowError(false);
      setUser(userWithoutSensitiveInfo);
      sessionStorage.setItem('user', JSON.stringify(userWithoutSensitiveInfo));
      sessionStorage.setItem('isLoggedIn', 'true');
    } else {
      setIsLoggedIn(false);
      setShowError(true);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setShowError(false);
    setUser(null);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('isLoggedIn');
  };

  const contextValue = {
    isLoggedIn,
    showError,
    user,
    login,
    logout,
  };

  return <LoginContext.Provider value={contextValue}>{children}</LoginContext.Provider>;
};

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
};
