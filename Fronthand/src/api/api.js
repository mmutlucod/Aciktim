// api.js
import axios from 'axios';

const baseURL = 'http://localhost:3000';
const api = axios.create({
  baseURL,
});



export const updateUser = (userData) => api.put('/update-user', userData);

export const getUserList = () => api.get('/user-list');
export const loginUser = (userData) => api.post('/login', userData);
export const getUserProfile = () => api.get('/profile');
export default api;
