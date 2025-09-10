import axios from 'axios';

const API_URL = "http://localhost:3000/auth/freelancer";

// Freelancer Signup
export const freelancerSignup = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, formData);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Signup failed" };
    }
};

// Freelancer Login
export const freelancerLogin = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Login failed" };
    }
};