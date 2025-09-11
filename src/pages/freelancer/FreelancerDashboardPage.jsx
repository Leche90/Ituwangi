import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const FreelancerDashboardPage = () => {
    const { freelancer, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Welcome, {freelancer?.fullName} 👋</h1>
            <p className="mt-2 text-gray-600">Email: {freelancer?.email}</p>
            <button
                onClick={handleLogout}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                Logout
            </button>
        </div>
    );
};

export default FreelancerDashboardPage;