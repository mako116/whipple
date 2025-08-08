 import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  headers: {
    'Content-Security-Policy': "default-src 'self'; img-src https://*; script-src 'self';",
  },
}); 

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving auth token:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    try {
      const { response } = error;

      if (response && response.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userDetails');
        localStorage.removeItem('loggedIn');

        // You cannot use `useNavigate` here directly,
        // So we use a redirect with `window.location`
        window.location.href = '/login';
      }
    } catch (err) {
      console.error('Error handling response error:', err);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
