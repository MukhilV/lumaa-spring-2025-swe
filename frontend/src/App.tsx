import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { AuthProvider } from './context/AuthContext';

import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/tsx/PrivateRoute';

function App() {
  return (
    <>
    
    {/* <Router>
        <Routes>
            
        </Routes>
    </Router> */}

    <Router>
      <AuthProvider>
        <Routes>
        <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
    </>
  );

}

export default App;
