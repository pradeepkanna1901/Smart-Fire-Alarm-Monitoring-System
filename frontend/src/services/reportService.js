import axios from "axios";

const API_URL = "http://localhost:8080/api/reports";

// Get all reports
export const getReports = () => axios.get(API_URL);

// Add report
export const addReport = (report) =>
  axios.post(API_URL, report);

// Update report
export const updateReport = (id, report) =>
  axios.put(`${API_URL}/${id}`, report);

// Delete report
export const deleteReport = (id) =>
  axios.delete(`${API_URL}/${id}`);