import axios from "axios";

const API_URL = "http://localhost:5000/api/tasks";

export const getTasks = (status) =>
  axios.get(API_URL, { params: status ? { status } : {} });

export const getTaskById = (id) => axios.get(`${API_URL}/${id}`);

export const createTask = (data) => axios.post(API_URL, data);

export const updateTask = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const toggleComplete = (id) =>
  axios.patch(`${API_URL}/${id}/complete`);

export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
