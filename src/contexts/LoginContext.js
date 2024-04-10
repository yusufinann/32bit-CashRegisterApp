import React, { createContext, useContext, useState } from 'react';

// Create a context
const LoginContext = createContext();

// Create a provider component
export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showError, setShowError] = useState(false);

  const login = (username, password) => {
    // Basit bir kullanıcı kontrolü (örneğin sadece 'admin' kullanıcısı için geçerli)
    if (username === 'admin' && password === '12345') {
      setIsLoggedIn(true);
      setShowError(false);
    } else {
      setIsLoggedIn(false);
      setShowError(true);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setShowError(false);
  };

  const contextValue = {
    isLoggedIn,
    showError,
    login,
    logout,
  };

  return <LoginContext.Provider value={contextValue}>{children}</LoginContext.Provider>;
};

// Create a custom hook to consume the context
export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error('useLogin must be used within a LoginProvider');
  }
  return context;
};
