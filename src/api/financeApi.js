import axios from "axios";

const API_URL = "http://localhost:3000/finance";

// Get earnings overview
const getEarnings = async () => {
  try {
    const response = await axios.get(`${API_URL}/earnings`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch earnings:", error);
    return [];
  }
};

export { getEarnings };

const financeApi = { getEarnings };
export default financeApi;
