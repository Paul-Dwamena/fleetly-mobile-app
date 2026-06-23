import api from '../api/client';
import { CONFIG } from '../app/config';
import { mockChangePassword, mockLogin } from '../mocks/authMock';
import { Storage, STORAGE_KEYS } from '../utils/storage';

export const persistAuth = async (authData) => {
  const payload = {
    token: authData.token,
    user: authData.user ?? authData,
  };

  await Storage.set(STORAGE_KEYS.AUTH, payload);
  return payload;
};

export const clearAuth = async () => {
  await Storage.remove(STORAGE_KEYS.AUTH);
};

export const login = async (email, password) => {
  if (CONFIG.USE_MOCK_API) {
    return mockLogin(email, password);
  }

  const response = await api.post('/auth/login', {
    email,
    password,
    userType: 'DRIVER',
  });
  return response.data;
};

export const changePassword = async (oldPassword, newPassword) => {
  if (CONFIG.USE_MOCK_API) {
    return mockChangePassword(oldPassword, newPassword);
  }

  const response = await api.post('/auth/change-password', {
    oldPassword,
    newPassword,
  });
  return response.data;
};
