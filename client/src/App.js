import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/login/Login";
import SignUp from "./components/login/Signup";
import Home from "./components/home/Home";
import Profile from "./components/profile/Profile";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
);

export default App;
