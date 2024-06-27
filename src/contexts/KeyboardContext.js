import React, { createContext, useContext, useState, useEffect } from 'react';


const KeyboardContext = createContext();

export const KeyboardProvider = ({ children }) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [keyboardPosition, setKeyboardPosition] = useState({ x: 0, y: 0 });
  const [activeInputId, setActiveInputId] = useState(null);
  const [inputValues, setInputValues] = useState({});


  const handleInputChange = (id, value) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [id]: value
      
    }));
    console.log(id)
   
  };
  

  const handleClear = () => {
    const activeInput = document.getElementById(activeInputId);
    if (activeInput) {
      activeInput.value = ''; // Aktif input alanını temizle
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        [activeInputId]: '' // inputValues'daki ilgili değeri temizle
      }));
    }
  };
  
  
  const handlePress = (value) => {
    const activeInput = document.activeElement;
    if (activeInput.tagName.toLowerCase() === 'input' || activeInput.tagName.toLowerCase() === 'textarea') {
      const caretPos = activeInput.selectionStart;
      const inputText = activeInput.value;
  
      // Klavyeden gelen değeri input alanının mevcut değeriyle birleştirerek yeni bir değer oluştur
      const newValue = inputText.substring(0, caretPos) + value + inputText.substring(caretPos);
  
      // Yeni değeri input alanına ata
      activeInput.value = newValue;
  
      // İmleci eklenen karakterin sonuna yerleştir
      activeInput.selectionStart = activeInput.selectionEnd = caretPos + value.length;
  
      // Eğer bir sanal klavye kullanıyorsak, klavyenin o anki değerini güncelleyelim
  
    }
   
  };
 
  

  const toggleKeyboard = () => {   //kullanmaya gerek kalmadı handleFocus sayesinde 
    setIsKeyboardOpen(false);
  };
  
//her input alanına tıklamada klavye açılıyor
  useEffect(() => {
    const handleFocus = (event) => {
      const clickedElement = event.target;
      if (clickedElement.tagName.toLowerCase() === 'input' || clickedElement.tagName.toLowerCase() === 'textarea') {
        if (clickedElement.id === 'display-controls-input') {
          return; // Prevent the keyboard from opening for the display-controls-input
        }
        setActiveInputId(clickedElement.id);
        setIsKeyboardOpen(true);
        const { left, bottom } = clickedElement.getBoundingClientRect();
        setKeyboardPosition({ x: left, y: bottom });
      } 
    };
  
    document.addEventListener('focus', handleFocus, true);
  
    return () => {
      document.removeEventListener('focus', handleFocus, true);
    };
  }, []);
  
  
  

  const contextValue = {
   
    isKeyboardOpen,
    setIsKeyboardOpen,
    keyboardPosition,
    setKeyboardPosition,
    handleInputChange,
    handlePress,
    toggleKeyboard,
    inputValues,
    setInputValues,
    handleClear,
    activeInputId

  };

  return (
    <KeyboardContext.Provider value={contextValue}>
      {children}
    </KeyboardContext.Provider>
  );
};

export const useKeyboardContext = () => {
  const context = useContext(KeyboardContext);
  if (!context) {
    throw new Error('useKeyboardContext must be used within a KeyboardProvider');
  }
  return context;
};  