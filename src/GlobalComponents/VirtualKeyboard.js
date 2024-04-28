import React, { useState, useRef, useEffect } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { Box } from "@mui/material";
import { useGlobalContext } from "../contexts/GlobalContext";

const VirtualKeyboard = ({ KeyboardPress, onInputChange }) => {
  const { isKeyboardOpen, setIsKeyboardOpen,keyboardPosition, setKeyboardPosition } = useGlobalContext();
  const [layoutName, setLayoutName] = useState("default");

  const keyboardRef = useRef(null);

  const handleKeyPress = (button) => {
    if (button === "{shift}" || button === "{lock}") {
      handleShift();
    }
  };

  const handleShift = () => {
    setLayoutName((prevLayoutName) =>
      prevLayoutName === "default" ? "shift" : "default"
    );
  };

  const onChange = (input) => {
    onInputChange(input);
    KeyboardPress(input);
  };

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (keyboardRef.current && !keyboardRef.current.contains(event.target)) {
        setIsKeyboardOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsKeyboardOpen, keyboardRef]);

  useEffect(() => {
    if (isKeyboardOpen) {
      const inputElement = document.activeElement;
      if (inputElement && inputElement.tagName.toLowerCase() === "input") {
        const { left, bottom } = inputElement.getBoundingClientRect();
        setKeyboardPosition({ x: left, y: bottom });
      }
    }
  }, [isKeyboardOpen, setKeyboardPosition]);
  

  return (
    <div style={{
      position: "absolute",
      left: keyboardPosition.x,
      top: isKeyboardOpen ? keyboardPosition.y : "-100%", // Klavye kapalıysa ekrandan dışarıda başlasın
      zIndex: 10000,
    }}>
      <div
        style={{
          position: "fixed",
          left: keyboardPosition.x,
          top: keyboardPosition.y,
          zIndex: 9999,
        }}
        onMouseDown={handleDragStart}
        ref={keyboardRef}
      >
        {isKeyboardOpen && (
          <Box
            border={1}
            borderRadius={4}
            p={2}
            style={{
              backgroundColor: "#2d2d2d",
              boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.4)",
              color: "#dc143c",
            }}
          > <div style={{ backgroundColor: "white", padding: "10px", borderRadius: "5px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)" }}>
            <Keyboard
              layoutName={layoutName}
              onChange={onChange}
              onKeyPress={handleKeyPress}
              theme={"hg-theme-default hg-layout-default myTheme"}
            />
            </div>
          </Box>
        )}
      </div>
    </div>
  );
};

export default VirtualKeyboard;
