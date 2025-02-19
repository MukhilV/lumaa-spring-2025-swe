import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { AuthProvider } from './context/AuthContext';

import './App.css';

function App() {
  return (
    <>
    
    {/* <Router>
        <Routes>
            
        </Routes>
    </Router> */}
                {/* <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} /> */}

    <Router>
      <AuthProvider>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </AuthProvider>
    </Router>
    </>
  );

}

export default App;
