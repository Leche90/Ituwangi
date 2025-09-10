import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FreelancerSignupForm from './components/auth/FreelancerSignupForm';
import FreelancerLoginForm from './components/auth/FreelancerLoginForm';
import FreelancerDashboardPage from './pages/freelancer/FreelancerDashboardPage';
import AuthProvider, { AuthContext } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/freelancer/signup" element={<FreelancerSignupForm />} />
                    <Route path="/freelancer/login" element={<FreelancerLoginForm />} />
                    <Route path="/freelancer/dashboard" element={<FreelancerDashboardPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;