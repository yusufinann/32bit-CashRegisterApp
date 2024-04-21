import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./HomePage/Home";
import LoginPage from "./LoginPage/Login";
import { LoginProvider } from "./contexts/LoginContext";
import Sales from "./HomePage/Sales";
import { GlobalContextProvider } from "./contexts/GlobalContext";
import OrderSummary from "./OrderSummary/OrderSummary";
import Receipts from "./HomePage/Receipts";

function App() {
  return (
    <GlobalContextProvider>
      <LoginProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<LoginPage />} />          
          <Route path="/sales" element={<Sales />} />
          <Route path="/price" element={<OrderSummary/>} />
          <Route path="/receipts" element={<Receipts />} />
        </Routes>
      </LoginProvider>
      </GlobalContextProvider>
  );
}

export default App;
