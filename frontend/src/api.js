import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-placement-system-s4ps.onrender.com/api",
});

// attach JWT token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;