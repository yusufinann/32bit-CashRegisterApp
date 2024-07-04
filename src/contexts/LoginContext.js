import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });
  const [showError, setShowError] = useState(false);
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const baseURL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${baseURL}/users`);
        setUser(response.data);
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (error) {
        console.error('Kullanıcı verileri alınırken hata oluştu:', error);
      }
    };

    if (!user) {
      fetchUserData();
    }
  }, [user,baseURL]);

  const login = (username, password) => {
    const foundUser = user.find(user => user.username === username && user.password === password);

    if (foundUser) {
      setIsLoggedIn(true);
      setShowError(false);
      setUser(foundUser);
      localStorage.setItem('user', JSON.stringify(foundUser));
      localStorage.setItem('isLoggedIn', true);
    } else {
      setIsLoggedIn(false);
      setShowError(true);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setShowError(false);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
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
    throw new Error('useLogin, LoginProvider içinde kullanılmalıdır');
  }
  return context;
};