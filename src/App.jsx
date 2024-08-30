import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RegisterPage } from './pages/RegisterPage';
import 'rsuite/dist/rsuite.min.css';
import UserPublic from './ProtectedRoute/publicRoute';
import UserProtect from './ProtectedRoute/privateRoute';
import WeatherDashboard from './pages/WeatherDashboard';
import ProfilePage from './pages/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserPublic><RegisterPage /></UserPublic>} />
        <Route path="/weather" element={<UserProtect><WeatherDashboard /></UserProtect>} />
        <Route path="/profile" element={<UserProtect><ProfilePage/></UserProtect>} />
      </Routes>
    </Router>
  );
}

export default App;
