import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showError, setShowError] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUser(response.data);
        // After fetching user data, check if user is already logged in
        const storedLoginStatus = sessionStorage.getItem('isLoggedIn'); // Use sessionStorage
        if (storedLoginStatus === 'true') {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (!user) {
      fetchUserData();
    }
  }, [user]);

  const login = (username, password) => {
    const foundUser = user.find(user => user.username === username && user.password === password);

    if (foundUser) {
      setIsLoggedIn(true);
      setShowError(false);
      setUser(foundUser);
      sessionStorage.setItem('isLoggedIn', 'true'); // Use sessionStorage
    } else {
      setIsLoggedIn(false);
      setShowError(true);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setShowError(false);
    setUser(null);
    sessionStorage.removeItem('isLoggedIn'); // Use sessionStorage
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
