import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4173/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;