
import { useState, useCallback } from 'react';
import { useKeyboardContext } from '../contexts/KeyboardContext';
import { useGlobalContext } from '../contexts/GlobalContext';
import { useCartContext } from '../contexts/CartContext';
import { useStoreStatus } from '../contexts/StoreStatusContext';

const useKeyboard = () => {
  const { handlePress, setInputValues, activeInputId, handleClear } = useKeyboardContext();
  const { handleBarcodeChange, handleChange, state } = useGlobalContext();
  const { handleAddToCart,setEmail } = useCartContext();
  const { workingHours, setWorkingHours } = useStoreStatus();
  const [isShiftPressed, setIsShiftPressed] = useState(false);

  const handleInputManipulation = useCallback(
    (manipulation) => {
      const activeInput = document.getElementById(activeInputId);
      if (activeInput && ['input', 'textarea'].includes(activeInput.tagName.toLowerCase())) {
        const caretPos = activeInput.selectionStart;
        const inputText = activeInput.value;
        let newValue;

        if (manipulation === 'space') {
          newValue = `${inputText.substring(0, caretPos)} ${inputText.substring(caretPos)}`;
          activeInput.selectionStart = activeInput.selectionEnd = caretPos + 1;
        } else if (manipulation === 'delete' && caretPos > 0) {
          newValue = `${inputText.substring(0, caretPos - 1)}${inputText.substring(caretPos)}`;
          activeInput.selectionStart = activeInput.selectionEnd = caretPos - 1;
        } else if (manipulation === 'tab') {
          newValue = `${inputText.substring(0, caretPos)}\t${inputText.substring(caretPos)}`;
          activeInput.selectionStart = activeInput.selectionEnd = caretPos + 1;
        }

        if (newValue !== undefined) {
          activeInput.value = newValue;
          setInputValues((prevValues) => ({ ...prevValues, [activeInputId]: newValue }));
        }
      }
    },
    [activeInputId, setInputValues]
  );

  const handleKeyPress = (key) => {
    if (activeInputId === 'display-controls-input') {
      return; // Prevent keyboard actions for DisplayAndControls input
    }
    if (key === 'clear') {
      handleClear();
    } else if (key === 'backspace') {
      handleInputManipulation('delete');
    } else if (key === 'shift' || key === 'caps') {
      setIsShiftPressed((prev) => !prev);
    } else if (key === 'space') {
      handleInputManipulation('space');
    } else if (key === 'tab') {
      handleInputManipulation('tab');
    } else {
      handlePress(key);
    }

    const inputValue = document.getElementById(activeInputId)?.value;

    if (activeInputId === 'barcode') {
      handleBarcodeChange({ target: { value: inputValue } });
      const matchedProduct = state.products.find((product) => product.barcode === inputValue);
      if (matchedProduct) {
        handleAddToCart(matchedProduct);
      }
    }

    if (activeInputId === 'searching') {
      handleChange({ target: { value: inputValue } });
    }
    if (activeInputId === 'start-time') {
      setWorkingHours({ ...workingHours, start: inputValue });
    }

    if (activeInputId === 'end-time') {
      setWorkingHours({ ...workingHours, end: inputValue });
    }
    if (activeInputId === 'email') {
      setEmail(inputValue);
    }
  };

  return { handleKeyPress, isShiftPressed };
};

export default useKeyboard;