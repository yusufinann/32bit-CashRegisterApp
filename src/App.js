import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';


import Home from "./HomePage/Home";
import Login from "./LoginPage/Login";
import { LoginProvider } from "./contexts/LoginContext";

function App() {
  return (
    <LoginProvider>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
    </Routes>
    </LoginProvider>
  );
}

export default App;
