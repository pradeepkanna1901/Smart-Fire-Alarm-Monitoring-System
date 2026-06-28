import axios from "axios";

const API_URL = "http://localhost:8080/api/incidents";

// Get all incidents
export const getIncidents = () => axios.get(API_URL);

// Add incident
export const addIncident = (incident) =>
  axios.post(API_URL, incident);

// Update incident
export const updateIncident = (id, incident) =>
  axios.put(`${API_URL}/${id}`, incident);

// Delete incident
export const deleteIncident = (id) =>
  axios.delete(`${API_URL}/${id}`);