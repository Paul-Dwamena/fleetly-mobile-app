import api from '../api/client';
import { CONFIG } from '../app/config';
import {
  mockCreateInspection,
  mockInspection,
  mockInspectionTemplate,
  mockInspectionTemplates,
  mockMyInspections,
} from '../mocks/inspectionMock';

export const getInspectionTemplates = async () => {
  if (CONFIG.USE_MOCK_API) {
    return mockInspectionTemplates();
  }

  const response = await api.get('/inspection-templates');
  return response.data;
};

export const getInspectionTemplate = async (templateId) => {
  if (CONFIG.USE_MOCK_API) {
    return mockInspectionTemplate(templateId);
  }

  const response = await api.get(`/inspection-templates/${templateId}`);
  return response.data;
};

export const createInspection = async (data) => {
  if (CONFIG.USE_MOCK_API) {
    return mockCreateInspection(data);
  }

  const response = await api.post('/inspections', data);
  return response.data;
};

export const getMyInspections = async () => {
  if (CONFIG.USE_MOCK_API) {
    return mockMyInspections();
  }

  const response = await api.get('/inspections/me');
  return response.data;
};

export const getInspection = async (inspectionId) => {
  if (CONFIG.USE_MOCK_API) {
    return mockInspection(inspectionId);
  }

  const response = await api.get(`/inspections/${inspectionId}`);
  return response.data;
};
