import React, { useState } from 'react';
import { useKeyboardContext } from '../contexts/KeyboardContext';
import { useGlobalContext } from '../contexts/GlobalContext';

// Sanal Klavye Bileşeni
const VirtualKeyboard = () => {
  const { handlePress, isKeyboardOpen,  keyboardPosition,setIsKeyboardOpen,
    setKeyboardPosition,handleClear,activeInputId,setInputValues} = useKeyboardContext();
    const {handleBarcodeChange,handleChange,} = useGlobalContext();
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  const manipulateInput = (manipulation) => {
    const activeInput = document.getElementById(activeInputId);
    if (activeInput && activeInput.tagName.toLowerCase() === 'input' || activeInput.tagName.toLowerCase() === 'textarea') {
      const caretPos = activeInput.selectionStart;
      const inputText = activeInput.value;
  
      let newValue;
      if (manipulation === 'space') {
        newValue = inputText.substring(0, caretPos) + ' ' + inputText.substring(caretPos);
        activeInput.selectionStart = activeInput.selectionEnd = caretPos + 1;
      } else if (manipulation === 'delete') {
        if (caretPos > 0) {
          newValue = inputText.substring(0, caretPos - 1) + inputText.substring(caretPos);
          activeInput.selectionStart = activeInput.selectionEnd = caretPos - 1;
        }
      } else if (manipulation === 'tab') {
        newValue = inputText.substring(0, caretPos) + '\t' + inputText.substring(caretPos);
        activeInput.selectionStart = activeInput.selectionEnd = caretPos + 1;
      }
  
      if (newValue !== undefined) {
        activeInput.value = newValue;
        setInputValues((prevInputValues) => ({
          ...prevInputValues,
          [activeInputId]: newValue
        }));
      }
    }
  };
  

  
  const handleSpace = () => manipulateInput('space');
  
  const handleDeleteOne = () => manipulateInput('delete');
  
  const handleTab = () => manipulateInput('tab');
  
  
  const handleClick = (value) => {
    handlePress(value);
  };

  const handleKeyPress = (key) => {
    if (key === "clear") {
      handleClear();
    } else if (key === "backspace") {
      handleDeleteOne();
    } else if (key === "shift" || key === "caps") {
      setIsShiftPressed(!isShiftPressed);
    } else if (key === "space") {
      handleSpace();
    } else if (key === "tab") {
      handleTab();
    } else {
      //const pressedKey = isShiftPressed ? key.toUpperCase() : key.toLowerCase();
      handleClick(key);
    }
  
    // "handleBarcodeChange" ve "handleChange" fonksiyonlarını çağırmadan önce, input alanının değerini güncelleyelim
  const inputValue = document.getElementById(activeInputId).value;

  if (activeInputId === "barcode") {
    handleBarcodeChange({ target: { value: inputValue } });
  }

  if (activeInputId === "searching") {
    handleChange({ target: { value: inputValue } });
  }

  };

  const keyboardLayout = [
    ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace"],
    ["tab", "q", "w", "e", "r", "t", "y", "u", "ı", "o", "p","ğ","ü", "[", "]", "\\", "clear"],
    ["caps", "a", "s", "d", "f", "g", "h", "j", "k", "l","ş","i", ";", "'"],
    ["shift", "z", "x", "c", "v", "b", "n", "m","ö","ç", ".", ",", "/", "@"],
    ["space"]
  ];

  const shiftKeyboardLayout = [
    ["~", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "_", "+", "backspace"],
    ["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P","Ğ","Ü", "{", "}", "|", "clear"],
    ["caps", "A", "S", "D", "F", "G", "H", "J", "K", "L","Ş","İ", ":", '"'],
    ["shift", "Z", "X", "C", "V", "B", "N", "M","Ö","Ç", "<", ">", "?", "@"],
    ["space"]
  ];
  const handleDragStart = (event) => {
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
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
    };

    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
  };
    const handleCloseKeyboard = (event) => {
    event.stopPropagation(); // Olayın üst sarmalayıcılara iletilememesini sağlar
    setIsKeyboardOpen(false);
  };

  const currentKeyboardLayout = isShiftPressed ? shiftKeyboardLayout : keyboardLayout;

  return (
    <div
    style={{
      position: "absolute",
      left: `${keyboardPosition.x}px`, // px eklemeyi unutmayın
      top: isKeyboardOpen ? `${keyboardPosition.y}px` : "-100%",
      zIndex: 10000
    }}
  > 
    <div
      style={{
        position: "fixed",
        left: `${keyboardPosition.x}px`, // px eklemeyi unutmayın
        top: `${keyboardPosition.y}px`, // px eklemeyi unutmayın
        zIndex: 9999,
      }}
      onMouseDown={handleDragStart}
      //ref={keyboardRef}   
    >
    {isKeyboardOpen && (
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px",
          backgroundColor: "#2d2d2d",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.4)",
          color: "#dc143c",
          maxWidth: "100%", // Klavyenin tamamını ekrana sığdırmak için
        }}
      >
        {" "}
     
          <div
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "5px",
              backgroundColor: "#f9f9f9",
              maxWidth: "100%",
              
           // margin: "0 auto", // Klavyeyi ortalamak için  #f9f9f9
            }}
          >
            {currentKeyboardLayout.map((row, rowIndex) => (
              <div
                key={rowIndex}
                style={{ display: "flex", marginBottom: "5px" }}
              >
                {row.map((key) => (
                  <button
                    key={key}
                    onClick={() => handleKeyPress(key)}
                    style={{
                      flex: 1,
                      border: "1px solid #ccc",
                      borderRadius: "3px",
                      backgroundColor: "white",
                      color: "black",
                      padding: "3px 8px",
                      margin: "0 3px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "1rem",
                      textTransform: "none", // Büyük harfe dönüşümü kapatıldı
                    }}
                  >
                   {["tab", "shift", "backspace", "clear", "enter", "caps"].includes(key) ? key : (isShiftPressed ? key.toUpperCase() : key.toLowerCase())}

                  </button>
                ))}
              </div>
            ))}
          </div>
          <button
            onClick={(event) => handleCloseKeyboard(event)}
            style={{
              position: "absolute",
              top: "-25px",
              right: "-25px",
              borderRadius: "50%",
              width: "30px",
              height: "30px",
              padding: "0",
              backgroundColor: "#dc143c",
              color: "white",
              fontSize: "1rem",
              cursor: "pointer",
            }}
          >
            &#10005;
          </button>
  
        </div>
      )}
    </div>
  </div>
  
  );
};

export default VirtualKeyboard;
