import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

const api = axios.create({
  baseURL: API_URL,
});

// har request se pehle token header me daal do
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getTasks = (status) =>
  api.get("/", { params: status ? { status } : {} });

export const getTaskById = (id) => api.get(`/${id}`);

export const createTask = (data) => api.post("/", data);

export const updateTask = (id, data) => api.put(`/${id}`, data);

export const toggleComplete = (id) => api.patch(`/${id}/complete`);

export const deleteTask = (id) => api.delete(`/${id}`);
