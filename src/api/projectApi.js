import axios from "axios";

const API_URL = "http://localhost:3000/projects";

// Fetch recent projects
const getRecent = async () => {
  try {
    const response = await axios.get(`${API_URL}/recent`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
};

// Create new project
const create = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Project creation failed" };
  }
};

export { getRecent, create };

const projectApi = { getRecent, create };

export default projectApi;
