import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Screens/Layout";
import Home from "../Screens/Home";
import Login from "../Screens/Login";

function Navigation() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route index element={<Home />} />
      <Route path="/Login" element={<Login/>}/>
    </Routes>
  );
}

export default Navigation;
