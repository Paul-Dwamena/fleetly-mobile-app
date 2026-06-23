import api from '../api/client';
import { CONFIG } from '../app/config';
import {
  mockCompleteTraining,
  mockMyTrainings,
  mockTraining,
} from '../mocks/trainingMock';

export const getMyTrainings = async () => {
  if (CONFIG.USE_MOCK_API) {
    return mockMyTrainings();
  }

  const response = await api.get('/trainings/me');
  return response.data;
};

export const getTraining = async (trainingId) => {
  if (CONFIG.USE_MOCK_API) {
    return mockTraining(trainingId);
  }

  const response = await api.get(`/trainings/${trainingId}`);
  return response.data;
};

export const completeTraining = async (trainingId, data = {}) => {
  if (CONFIG.USE_MOCK_API) {
    return mockCompleteTraining(trainingId, data);
  }

  const response = await api.post(`/trainings/${trainingId}/complete`, data);
  return response.data;
};
