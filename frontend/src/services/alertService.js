import axios from "axios";

const API_URL = "http://localhost:8080/api/alerts";

export const getAlerts = () => axios.get(API_URL);

export const addAlert = (alert) => axios.post(API_URL, alert);

export const updateAlert = (id, alert) =>
  axios.put(`${API_URL}/${id}`, alert);

export const deleteAlert = (id) =>
  axios.delete(`${API_URL}/${id}`);