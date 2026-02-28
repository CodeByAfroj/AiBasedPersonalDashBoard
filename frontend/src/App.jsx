
import {HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Userdash from "./pages/Userdash";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import AdminDash from "./pages/AdminDash";
// Signin Component



// App Component
export default function App() {


  return (
 <Router>
      <Routes>
        <Route path="/" element={<Home/> } />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/user-dash" element={<Userdash />} />
        <Route path="/admin-dashboard" element={<AdminDash />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
 </Router> 
  );
}
 