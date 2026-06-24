import api from '../api/client';

export const getDriverOverview = async () => {
  const response = await api.get('/drivers/me/overview');
  return response.data;
};

export const getDriverProfile = async () => {
  const response = await api.get('/drivers/me/profile');
  return response.data;
};
