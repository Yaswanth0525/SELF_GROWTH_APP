import axios from 'axios';
console.log('API Base URL:', import.meta.env.VITE_API_URL); // Debugging line to check the base URL

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Backend URL
});

// Add a request interceptor to attach the JWT token
API.interceptors.request.use((config) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
        const token = JSON.parse(userInfo).token;
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default API;
