import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/auth";

// Register
export const registerUser = (data) => axios.post(`${API_URL}/register`, data);

// Login
export const loginUser = (data) => axios.post(`${API_URL}/login`, data);
