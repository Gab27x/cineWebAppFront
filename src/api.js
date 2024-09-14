// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8080'; // La URL de tu API de Spring

const api = axios.create({
    baseURL: API_URL,
});

export default api;
