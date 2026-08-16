import axios from "axios";

// Live Render Backend URL
const API = axios.create({
  baseURL:
    process.env.REACT_APP_API_URL || "https://mart-z00d.onrender.com",
});

export default API;