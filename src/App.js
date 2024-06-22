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
import Reports from "./HomePage/Reports";
import { StoreStatusProvider } from "./contexts/StoreStatusContext";
import Settings from "./HomePage/Settings";
import { ThemeProvider} from '../src/contexts/ThemeContext';
import ThemedApp from "./GlobalComponents/themedApp";
import { LanguageProvider } from "./contexts/LanguageContext";


function App() {
  return (
    <ThemeProvider>
      <ThemedApp>
    <KeyboardProvider> 
      <LanguageProvider>
        <StoreStatusProvider>
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
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </LoginProvider>
      </CartContextProvider>
      </GlobalContextProvider>
      </StoreStatusProvider>
      </LanguageProvider>
      </KeyboardProvider> 
      </ThemedApp>
      </ThemeProvider>
  );
}

export default App;
