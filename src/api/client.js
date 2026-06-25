import axios from 'axios';
import { CONFIG } from '../app/config';
import { store } from '../store';
import { logout } from '../store/slices/authSlice';
import { Storage, STORAGE_KEYS } from '../utils/storage';

const api = axios.create({
  baseURL: CONFIG.BASE_URL,
  timeout: CONFIG.TIMEOUT,
});

api.interceptors.request.use(async (config) => {
  const auth = await Storage.get(STORAGE_KEYS.AUTH);

  if (auth?.token) {
    config.headers.Authorization = `Bearer ${auth.token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await Storage.remove(STORAGE_KEYS.AUTH);
      store.dispatch(logout());
    }

    return Promise.reject(error);
  },
);

export default api;
