// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/events'; // Change this to your backend URL if needed

export const addTask = async (eventId, taskData) => {
    return await axios.post(`${API_URL}/${eventId}/tasks`, taskData);
};

export const removeTask = async (eventId, taskId) => {
    return await axios.delete(`${API_URL}/${eventId}/tasks/${taskId}`);
};

export const updateTask = async (eventId, taskId, taskData) => {
    return await axios.put(`${API_URL}/${eventId}/tasks/${taskId}`, taskData);
};

export const getTasks = async (eventId) => {
    return await axios.get(`${API_URL}/${eventId}/tasks`);
};

export const addUser = async (eventId, userData) => {
    return await axios.post(`${API_URL}/${eventId}/users`, userData);
};

export const removeUser = async (eventId, userId) => {
    return await axios.delete(`${API_URL}/${eventId}/users/${userId}`);
};

export const updateUserRole = async (eventId, userId, roleData) => {
    return await axios.put(`${API_URL}/${eventId}/users/${userId}`, roleData);
};
