import api from '../api/client';

export const getMyVehicleRequests = async () => {
  const response = await api.get('/driver-vehicle-requests/me');
  return response.data;
};

export const submitVehicleRequest = async (data) => {
  const response = await api.post('/driver-vehicle-requests/me', data);
  return response.data;
};

export const getUnassignedVehicles = async () => {
  const response = await api.get('/vehicle-assignments/unassigned');
  return response.data;
};
