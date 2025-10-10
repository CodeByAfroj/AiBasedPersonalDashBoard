
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Userdash from "./pages/Userdash";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { useState } from "react";
import Nav from "./pages/Nav";
// Signin Component



// App Component
export default function App() {


  return (
 <BrowserRouter>
 <Nav/>
      <Routes>
        <Route path="/" element={<Home/> } />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/user-dash" element={<Userdash />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
 </BrowserRouter> 
  );
}
 