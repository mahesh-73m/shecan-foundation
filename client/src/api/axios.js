import axios from 'axios';

axios.post(
  `${process.env.REACT_APP_API_URL}/api/contacts`,
  formData
).then(response => {
  setIsSuccess(true);
  setFormData({ name: '', email: '', message: '' });
}).catch(error => {
  console.error('Error submitting contact form:', error);
  setIsSuccess(false);
});

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;