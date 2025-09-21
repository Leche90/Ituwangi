import axios from "axios";

const API_URL = "http://localhost:3000/auth";

// Freelancer Signup
const freelancerSignup = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, formData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};

// Freelancer Login
const freelancerLogin = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};

// Fetch freelancer notes (for dashboard)
const getNotes = async () => {
  try {
    const response = await axios.get("http://localhost:3000/notes");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return [];
  }
};

// Export both named and default
export { freelancerSignup, freelancerLogin, getNotes };

const freelancerApi = {
  signup: freelancerSignup,
  login: freelancerLogin,
  getNotes,
};

export default freelancerApi;
