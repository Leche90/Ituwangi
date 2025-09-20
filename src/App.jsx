import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FreelancerSignupForm from './components/auth/FreelancerSignupForm';
import FreelancerLoginForm from './components/auth/FreelancerLoginForm';
import Dashboard from './pages/freelancer/Dashboard';
import AuthProvider from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/signup" element={<FreelancerSignupForm />} />
                    <Route path="/login" element={<FreelancerLoginForm />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;