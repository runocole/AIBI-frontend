import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },
  
  register: async (email: string, password: string, name: string) => {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

// Datasets API
export const datasetsAPI = {
  getAll: async () => {
    const response = await api.get('/datasets');
    return response.data;
  },
  
  getById: async (id: string) => {
    const response = await api.get(`/datasets/${id}`);
    return response.data;
  },
  
  upload: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/datasets/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};

// KPIs API
export const kpisAPI = {
  getSalesSummary: async (datasetId: string) => {
    const response = await api.get(`/kpis/sales_summary?dataset_id=${datasetId}`);
    return response.data;
  },
  
  getTopProducts: async (datasetId: string) => {
    const response = await api.get(`/kpis/top_products?dataset_id=${datasetId}`);
    return response.data;
  },
};