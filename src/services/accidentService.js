import api from '../api/client';

export const getMyAccidents = async () => {
  const response = await api.get('/accidents/me');
  return response.data;
};

export const getAccident = async (accidentId) => {
  const response = await api.get(`/accidents/${accidentId}`);
  return response.data;
};

export const reportAccident = async (data) => {
  const response = await api.post('/accidents/me/report', data);
  return response.data;
};
