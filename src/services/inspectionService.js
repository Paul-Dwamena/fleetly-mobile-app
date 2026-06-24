import api from '../api/client';

export const getInspectionTemplates = async () => {
  const response = await api.get('/inspection-templates');
  return response.data;
};

export const getInspectionTemplate = async (templateId) => {
  const response = await api.get(`/inspection-templates/${templateId}`);
  return response.data;
};

export const createInspection = async (data) => {
  const response = await api.post('/inspections/driver/create', data);
  return response.data;
};

export const getMyInspections = async () => {
  const response = await api.get('/inspections/me');
  return response.data;
};

export const getInspection = async (inspectionId) => {
  const response = await api.get(`/inspections/${inspectionId}`);
  return response.data;
};
