import axios from 'axios';

const httpClient = axios.create({ baseURL: 'http://localhost:3333' });

httpClient.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('e-feira-token');
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default httpClient;
