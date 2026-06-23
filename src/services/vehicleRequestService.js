import api from '../api/client';
import { CONFIG } from '../app/config';
import {
  mockMyVehicleRequests,
  mockSubmitVehicleRequest,
  mockUnassignedVehicles,
  mockVehicleRequest,
} from '../mocks/vehicleRequestMock';

export const getMyVehicleRequests = async () => {
  if (CONFIG.USE_MOCK_API) {
    return mockMyVehicleRequests();
  }

  const response = await api.get('/driver-vehicle-requests/me');
  return response.data;
};

export const getVehicleRequest = async (requestId) => {
  if (CONFIG.USE_MOCK_API) {
    return mockVehicleRequest(requestId);
  }

  const data = await getMyVehicleRequests();
  const requests = Array.isArray(data) ? data : data?.content ?? [];
  const request = requests.find((item) => item.id === requestId);

  if (!request) {
    throw new Error('Vehicle request not found.');
  }

  return request;
};

export const submitVehicleRequest = async (data) => {
  if (CONFIG.USE_MOCK_API) {
    return mockSubmitVehicleRequest(data);
  }

  const response = await api.post('/driver-vehicle-requests/me', data);
  return response.data;
};

export const getUnassignedVehicles = async () => {
  if (CONFIG.USE_MOCK_API) {
    return mockUnassignedVehicles();
  }

  const response = await api.get('/vehicle-assignments/unassigned');
  return response.data;
};
