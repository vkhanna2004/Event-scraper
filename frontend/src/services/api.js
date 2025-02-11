import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000"; 

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 5 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchEvents = async (page = 1, limit = 24) => {
  try {
    const response = await api.get(`${API_BASE_URL}/events`, {
      params: { page, limit },  // Send page & limit as query parameters
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    throw new Error(error.response?.data?.message || "Error fetching events");
  }
};

export const scrapeEvents = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/scrape`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error starting scraping");
  }
};
