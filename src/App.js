import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./HomePage/Home";
import Login from "./LoginPage/Login";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
