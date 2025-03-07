import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Authentication Services
export const register = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await api.post('/users/login', userData);
  return response.data;
};

export const getUserProfile = async () => {
  const response = await api.get('/users/profile');
  return response.data;
};

// Learning Path Services
export const initializeLearningPath = async () => {
  const response = await api.post('/learning-path/init');
  return response.data;
};

export const getLearningPath = async () => {
  const response = await api.get('/learning-path');
  return response.data;
};

export const updateTaskStatus = async (topicId, taskId, taskData) => {
  const response = await api.put(`/learning-path/topics/${topicId}/tasks/${taskId}`, taskData);
  return response.data;
};

export const addTopic = async (topicData) => {
  const response = await api.post('/learning-path/topics', topicData);
  return response.data;
};

export const addTask = async (topicId, taskData) => {
  const response = await api.post(`/learning-path/topics/${topicId}/tasks`, taskData);
  return response.data;
};

export default api;