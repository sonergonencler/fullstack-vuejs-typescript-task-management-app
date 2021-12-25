import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import { useUIStore } from '@/store/ui';
import { getToken } from './storage';

const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API,
});

httpClient.interceptors.request.use((config) => {
  const token = getToken();
  config.headers!.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const uiStore = useUIStore();
    const { logoutHandler } = useAuthStore();

    if (error.response && error.response.status === 401) {
      logoutHandler();
    }

    const errorMessage = error.response?.data.error || 'Something went wrong. Please try again.';
    uiStore.openDialog('Error', errorMessage);
    return Promise.reject(error);
  }
);

export default httpClient;
