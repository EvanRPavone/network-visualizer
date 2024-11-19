import React, { useState } from 'react';
import NetworkVisualizer from './components/NetworkVisualizer';
// import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login'; // Create a Login component

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/visualizer"
          element={isAuthenticated ? <NetworkVisualizer /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to={isAuthenticated ? '/visualizer' : '/login'} />} />
      </Routes>
    </Router>
  );
};

export default App;
