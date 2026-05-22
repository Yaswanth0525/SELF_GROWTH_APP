import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Backend URL
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
