import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [freelancer, setFreelancer] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);

    useEffect(() => {
        if (token && !freelancer) {
            try {
                const storedFreelancer = localStorage.getItem('freelancer');
                if (storedFreelancer && storedFrelancer !== "undefined") {
                    setFreelancer(JSON.parse(storedFrelancer));
                }
            } catch (error) {
                console.error("Failed to parse freelancer from localStorage:", error);
                localStorage.removeItem('freelancer');
                }
            }
    }, [token, freelancer]);

        const login = (data) => {
            setToken(data.token || data.access_token);
            setFreelancer(data.freelancer);

            localStorage.setItem('token', data.token || data.access_token);
            localStorage.setItem('freelancer', JSON.stringify(data.freelancer));
        };

        const logout = () => {
            setToken(null);
            setFreelancer(null);
            localStorage.removeItem('token');
            localStorage.removeItem('freelancer');
        };

        return (
            <AuthContext.Provider value={{ freelancer, token, login, logout }}>
                {children}
            </AuthContext.Provider>
        );
    };

export default AuthProvider;