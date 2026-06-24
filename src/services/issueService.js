import api from '../api/client';

export const getMyIssues = async () => {
  const response = await api.get('/issues/me');
  return response.data;
};

export const createIssue = async (data) => {
  const response = await api.post('/issues/me', data);
  return response.data;
};

export const getIssue = async (issueId) => {
  const response = await api.get(`/issues/${issueId}`);
  return response.data;
};
