// api/axiosClient.js
import axios from 'axios';
import { getToken } from '../utils/secureStore';

// Replace with your backend IP + port
const BASE_URL = 'http://192.168.0.104:5000';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

// Attach token automatically to every request
api.interceptors.request.use(
  async (config) => {
    const token = await getToken('userToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (err) => Promise.reject(err)
);

export default api;
