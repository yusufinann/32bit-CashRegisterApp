import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import styled from 'styled-components';

const ToggleButton = styled.button`
  background-color: ${({ theme }) => (theme === 'light' ? '#000' : '#fff')};
  color: ${({ theme }) => (theme === 'light' ? '#fff' : '#000')};
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease; /* Geçiş efekti eklendi */
  outline: none;
  border-radius: 5px;

  &:hover {
    background-color: ${({ theme }) => (theme === 'light' ? '#444' : '#ddd')};
    color: ${({ theme }) => (theme === 'light' ? '#fff' : '#000')};
  }
`;

const SwitchTheme = ({t}) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleButton theme={theme} onClick={toggleTheme}>
       {theme === 'light' ? t('Switch to Dark Theme') : t('Switch to Light Theme')}
    </ToggleButton>
  );
};

export default SwitchTheme;
