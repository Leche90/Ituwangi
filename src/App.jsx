import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FreelancerSignupForm from './components/auth/FreelancerSignupForm';
import FreelancerLoginForm from './components/auth/FreelancerLoginForm';
import FreelancerDashboardPage from './pages/freelancer/FreelancerDashboardPage';
import AuthProvider from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/signup" element={<FreelancerSignupForm />} />
                    <Route path="/login" element={<FreelancerLoginForm />} />
                    <Route path="/freelancer/dashboard" element={<FreelancerDashboardPage />} />
                    <Route path="/" element={<Navigate to="/dasboard" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;