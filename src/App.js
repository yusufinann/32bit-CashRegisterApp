import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./HomePage/Home";
import LoginPage from "./LoginPage/Login";
import { LoginProvider } from "./contexts/LoginContext";
import Sales from "./HomePage/Sales";

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<LoginPage />} />          
          <Route path="/sales" element={<Sales />} />
        </Routes>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
