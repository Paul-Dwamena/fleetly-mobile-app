import api from '../api/client';
import { CONFIG } from '../app/config';
import { mockDriverOverview, mockDriverProfile } from '../mocks/driverMock';

export const getDriverOverview = async () => {
  if (CONFIG.USE_MOCK_API) {
    return mockDriverOverview();
  }

  const response = await api.get('/drivers/me/overview');
  return response.data;
};

export const getDriverProfile = async () => {
  if (CONFIG.USE_MOCK_API) {
    return mockDriverProfile();
  }

  const response = await api.get('/drivers/me/profile');
  return response.data;
};
