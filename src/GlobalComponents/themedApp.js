import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemedApp = ({ children }) => {
  const { theme } = useTheme();
  const backgroundColor = theme === 'dark' ? '#3c3c3c' : '#f0f0f0';
  const textColor = theme === 'dark' ? 'white' : 'black';

  return (
    <div style={{ backgroundColor: backgroundColor, color: textColor, minHeight: '100vh'}}>
      {children}
    </div>
  );
};

export default ThemedApp;
