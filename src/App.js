import React from "react";
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';


import Home from "./HomePage/Home";
import Login from "./LoginPage/Login";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
