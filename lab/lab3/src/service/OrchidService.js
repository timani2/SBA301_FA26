import axios from "axios";

const API_URL = "http://localhost:9999/orchids";

export const fetchOrchids = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchOrchidById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};
