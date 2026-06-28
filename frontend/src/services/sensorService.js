import axios from "axios";

const API_URL = "http://localhost:8080/api/sensors";

export const getSensors = () => axios.get(API_URL);

export const addSensor = (sensor) => axios.post(API_URL, sensor);

export const updateSensor = (id, sensor) =>
  axios.put(`${API_URL}/${id}`, sensor);

export const deleteSensor = (id) =>
  axios.delete(`${API_URL}/${id}`);