import api from '../api/client';
import { CONFIG } from '../app/config';
import { mockCreateIssue, mockIssue, mockMyIssues } from '../mocks/issueMock';

export const getMyIssues = async () => {
  if (CONFIG.USE_MOCK_API) {
    return mockMyIssues();
  }

  const response = await api.get('/issues/me');
  return response.data;
};

export const createIssue = async (data) => {
  if (CONFIG.USE_MOCK_API) {
    return mockCreateIssue(data);
  }

  const response = await api.post('/issues/me', data);
  return response.data;
};

export const getIssue = async (issueId) => {
  if (CONFIG.USE_MOCK_API) {
    return mockIssue(issueId);
  }

  const response = await api.get(`/issues/${issueId}`);
  return response.data;
};
