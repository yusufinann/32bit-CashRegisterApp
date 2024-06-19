import React from 'react'
import {useTheme} from '../contexts/ThemeContext'

const AppContent = () => {
    const { theme } = useTheme();
    
    const appStyle = {
      backgroundColor: theme === 'light' ? '#fff' : '#333',
      color: theme === 'light' ? '#000' : '#fff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    };
  
    return (
      <div style={appStyle}>
        <h1>{theme === 'light' ? 'Light Theme' : 'Dark Theme'}</h1>
        This is Thema area
      </div>
    );
  };

  export default AppContent;