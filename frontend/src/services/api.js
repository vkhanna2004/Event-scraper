import axios from "axios";

const API_BASE_URL = import.meta.env.API_BASE_URL || "http://127.0.0.1:5000"; 

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // 5 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchEvents = async (page = 1, limit = 24) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/events`, {
      params: { page, limit },  // ✅ Send page & limit as query parameters
    });
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    throw new Error(error.response?.data?.message || "Error fetching events");
  }
};

export const scrapeEvents = async () => {
  try {
    const response = await axios.get("/scrape");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error starting scraping");
  }
};
