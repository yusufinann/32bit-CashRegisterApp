import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./HomePage/Home";
import LoginPage from "./LoginPage/Login";
import { LoginProvider } from "./contexts/LoginContext";
import Sales from "./HomePage/Sales";
import { GlobalContextProvider } from "./contexts/GlobalContext";
import OrderSummary from "./OrderSummary/OrderSummary";
import Receipts from "./HomePage/Receipts";
import { KeyboardProvider } from "./contexts/KeyboardContext";
import VirtualKeyboard from "./GlobalComponents/VirtualKeyboard";
import { CartContextProvider } from "./contexts/CartContext";

function App() {
  return (
    <KeyboardProvider> 
      
    <GlobalContextProvider>
    <CartContextProvider>
    <VirtualKeyboard />
      <LoginProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<LoginPage />} />          
          <Route path="/sales" element={<Sales />} />
          <Route path="/price" element={<OrderSummary/>} />
          <Route path="/receipts" element={<Receipts />} />
        </Routes>
      </LoginProvider>
      </CartContextProvider>
      </GlobalContextProvider>
      </KeyboardProvider> 
  );
}

export default App;
