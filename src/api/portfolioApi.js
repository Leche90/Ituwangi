import axios from "axios";

const API_URL = "http://localhost:3000/portfolio";

// Get highlights for dashboard
const getHighlights = async () => {
  try {
    const response = await axios.get(`${API_URL}/highlights`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch portfolio highlights:", error);
    return [];
  }
};

// Add new portfolio item
const add = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Portfolio upload failed" };
  }
};

export { getHighlights, add };

const portfolioApi = { getHighlights, add };

export default portfolioApi;
