import api from '../api/client';

export const getMyTrainings = async () => {
  const response = await api.get('/trainings/me');
  return response.data;
};

export const getTraining = async (trainingId) => {
  const response = await api.get(`/trainings/${trainingId}`);
  return response.data;
};

export const completeTraining = async (trainingId, data = {}) => {
  const response = await api.post(`/trainings/${trainingId}/complete`, data);
  return response.data;
};
