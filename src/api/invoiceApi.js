import axios from "axios";

const API_URL = "http://localhost:3000/invoices";

// Fetch recent invoices
const getRecent = async () => {
  try {
    const response = await axios.get(`${API_URL}/recent`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch invoices:", error);
    return [];
  }
};

// Create invoice
const create = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Invoice creation failed" };
  }
};

export { getRecent, create };

const invoiceApi = { getRecent, create };

export default invoiceApi;
