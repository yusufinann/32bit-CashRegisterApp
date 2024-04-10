import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./HomePage/Home";
import LoginPage from "./LoginPage/Login";
import { LoginProvider } from "./contexts/LoginContext";

function App() {
  return (
    <BrowserRouter>
      <LoginProvider>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </LoginProvider>
    </BrowserRouter>
  );
}

export default App;
