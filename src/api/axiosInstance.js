import axios from "axios";

const backendURL = import.meta.env.VITE_APP_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: backendURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
