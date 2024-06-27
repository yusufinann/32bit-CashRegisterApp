import React, { useCallback } from 'react';
import { useKeyboardContext } from '../contexts/KeyboardContext';
import { useTheme } from '../contexts/ThemeContext';
import useKeyboard from './useKeyboard';
import './Keyboard.css';

const keyboardLayouts = {
  default: [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace"],
    ["tab", "q", "w", "e", "r", "t", "y", "u", "ı", "o", "p", "ğ", "ü", "[", "]", "\\", "clear"],
    ["caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "ş", "i", ";", "'"],
    ["shift", "z", "x", "c", "v", "b", "n", "m", "ö", "ç", ".", ",", "/", "@"],
    ["space"]
  ],
  shift: [
    ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace"],
    ["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "Ğ", "Ü", "{", "}", "|", "clear"],
    ["caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", "Ş", "İ", ":", '"'],
    ["shift", "Z", "X", "C", "V", "B", "N", "M", "Ö", "Ç", "<", ">", "?", "@"],
    ["space"]
  ]
};

const VirtualKeyboard = () => {
  const { isKeyboardOpen, keyboardPosition, setIsKeyboardOpen, setKeyboardPosition } = useKeyboardContext();
  const { theme } = useTheme();
  const { handleKeyPress, isShiftPressed } = useKeyboard();

  const handleDragStart = useCallback((event) => {
    event.preventDefault();
    const { clientX, clientY } = event;
    const offsetX = clientX - keyboardPosition.x;
    const offsetY = clientY - keyboardPosition.y;

    const handleDragMove = (moveEvent) => {
      const { clientX, clientY } = moveEvent;
      setKeyboardPosition({
        x: clientX - offsetX,
        y: clientY - offsetY,
      });
    };
  
    const handleDragEnd = () => {
      document.removeEventListener('mousemove', handleDragMove);
      document.removeEventListener('mouseup', handleDragEnd);
    };

    document.addEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);

  }, [keyboardPosition, setKeyboardPosition]);
  

  const handleCloseKeyboard = (event) => {
    event.stopPropagation();
    setIsKeyboardOpen(false);
  };

  const currentLayout = isShiftPressed ? keyboardLayouts.shift : keyboardLayouts.default;

  return (
    <div
      className={`keyboard-container ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}
      style={{ left: `${keyboardPosition.x}px`, top: `${keyboardPosition.y}px`, display: isKeyboardOpen ? 'block' : 'none' }}
      onMouseDown={handleDragStart}
    >
      <div className="keyboard-inner">
        <div className="keys-container">
          {currentLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="key-row"  style={{ display: "flex", marginBottom: "5px" }}>
              {row.map((key) => (
                <button key={key} onClick={() => handleKeyPress(key)} className={`key-button ${key === 'backspace' ? 'backspace-button' : ''}`}>
                  {key}
                </button>
              ))}
            </div>
          ))}
        </div>
        <button onClick={handleCloseKeyboard} className="close-button">&#10005;</button>
      </div>
    </div>
  );
};

export default VirtualKeyboard;
