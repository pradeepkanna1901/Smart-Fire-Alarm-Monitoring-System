import axios from "axios";

const API_URL = "http://localhost:8080/api/settings";

export const getSettings = () => axios.get(API_URL);

export const addSettings = (settings) =>
    axios.post(API_URL, settings);

export const updateSettings = (id, settings) =>
    axios.put(`${API_URL}/${id}`, settings);

export const deleteSettings = (id) =>
    axios.delete(`${API_URL}/${id}`);