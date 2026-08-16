import axios from "axios";

// Live Render URL as fallback
const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://mart-backend-jyt2.onrender.com",
});

export default API;