import axios from "axios";

const API = axios.create({
  baseURL: "https://smart-placement-system-s4ps.onrender.com/api",
});

export default API;