const delay = (ms = 600) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const TEMPLATES = [
  {
    id: '83179425-e8fa-4a2a-96a7-e3e20b20d24c',
    name: 'Daily Pre-Trip Inspection',
    description: 'Standard checks before starting your route.',
    itemCount: 5,
  },
  {
    id: '56bef556-0d4d-4e44-a307-72d9e8e2ae8f',
    name: 'Weekly Safety Check',
    description: 'Detailed weekly vehicle safety review.',
    itemCount: 4,
  },
];

const TEMPLATE_ITEMS = {
  '83179425-e8fa-4a2a-96a7-e3e20b20d24c': [
    {
      id: '200856a6-a43f-424f-9f85-a1ab49ff4e67',
      label: 'Brakes',
      description: 'Check brake pads, fluid, and response.',
    },
    {
      id: '411f4e8b-3698-440c-90e1-745634fc114b',
      label: 'Tyres',
      description: 'Inspect tread depth and tyre pressure.',
    },
    {
      id: '145e571e-44c1-4f5c-af9f-d0e922b864f3',
      label: 'Lights',
      description: 'Headlights, indicators, and brake lights.',
    },
    {
      id: 'a81f77df-9983-4b4a-a141-eab0d0abe604',
      label: 'Fluids',
      description: 'Oil, coolant, and washer fluid levels.',
    },
    {
      id: '452b67d7-40d3-4756-8890-7909512d9cbc',
      label: 'Mirrors',
      description: 'Check all mirrors are secure and clear.',
    },
  ],
  '56bef556-0d4d-4e44-a307-72d9e8e2ae8f': [
    {
      id: 'item-w1',
      label: 'Seat belts',
      description: 'All seat belts function correctly.',
    },
    {
      id: 'item-w2',
      label: 'Horn',
      description: 'Horn is audible and working.',
    },
    {
      id: 'item-w3',
      label: 'Windscreen',
      description: 'No cracks or obstructions.',
    },
    {
      id: 'item-w4',
      label: 'Fire extinguisher',
      description: 'Present and within expiry date.',
    },
  ],
};

const MOCK_VEHICLE = {
  id: 'a461b17c-32e7-4240-a770-18f737f9256b',
  plateNumber: 'GR-4521-21',
};

const MOCK_OPERATOR_ID = '9d874b48-20d3-469f-a5cc-59e65bf391c4';

let mockInspections = [
  {
    id: '16aeddef-7df9-44d6-8660-376ff7d7a028',
    templateId: '83179425-e8fa-4a2a-96a7-e3e20b20d24c',
    templateName: 'Daily Pre-Trip Inspection',
    vehicleId: MOCK_VEHICLE.id,
    vehiclePlate: MOCK_VEHICLE.plateNumber,
    completedAt: '2026-06-18T08:30:00',
    items: [
      {
        templateItemId: '200856a6-a43f-424f-9f85-a1ab49ff4e67',
        label: 'Brakes',
        passed: true,
        remarks: 'All good',
      },
      {
        templateItemId: '411f4e8b-3698-440c-90e1-745634fc114b',
        label: 'Tyres',
        passed: true,
        remarks: 'All good',
      },
      {
        templateItemId: '145e571e-44c1-4f5c-af9f-d0e922b864f3',
        label: 'Lights',
        passed: false,
        remarks: 'Inadequate',
      },
      {
        templateItemId: 'a81f77df-9983-4b4a-a141-eab0d0abe604',
        label: 'Fluids',
        passed: true,
        remarks: 'All good',
      },
      {
        templateItemId: '452b67d7-40d3-4756-8890-7909512d9cbc',
        label: 'Mirrors',
        passed: false,
        remarks: 'Mirrors destroyed',
      },
    ],
  },
];

export const mockInspectionTemplates = async () => {
  await delay();
  return TEMPLATES;
};

export const mockInspectionTemplate = async (templateId) => {
  await delay();

  const template = TEMPLATES.find((item) => item.id === templateId);

  if (!template) {
    throw new Error('Inspection template not found.');
  }

  return {
    ...template,
    items: TEMPLATE_ITEMS[templateId] ?? [],
  };
};

export const mockMyInspections = async () => {
  await delay();
  return mockInspections.map((inspection) => ({
    id: inspection.id,
    templateId: inspection.templateId,
    templateName: inspection.templateName,
    vehiclePlate: inspection.vehiclePlate,
    completedAt: inspection.completedAt,
    passedCount: inspection.items.filter((item) => item.passed).length,
    failedCount: inspection.items.filter((item) => !item.passed).length,
    totalItems: inspection.items.length,
  }));
};

export const mockInspection = async (inspectionId) => {
  await delay();

  const inspection = mockInspections.find((item) => item.id === inspectionId);

  if (!inspection) {
    throw new Error('Inspection not found.');
  }

  return inspection;
};

export const mockCreateInspection = async (data) => {
  await delay();

  const template = TEMPLATES.find((item) => item.id === data.templateId);
  const templateItems = TEMPLATE_ITEMS[data.templateId] ?? [];

  const items = data.items.map((item) => {
    const templateItem = templateItems.find(
      (entry) => entry.id === item.templateItemId,
    );

    return {
      templateItemId: item.templateItemId,
      label: templateItem?.label ?? 'Check item',
      passed: item.passed,
      remarks: item.remarks ?? '',
    };
  });

  const newInspection = {
    id: `insp-${Date.now()}`,
    templateId: data.templateId,
    templateName: template?.name ?? 'Inspection',
    vehicleId: data.vehicleId,
    vehiclePlate: MOCK_VEHICLE.plateNumber,
    completedAt: new Date().toISOString(),
    items,
  };

  mockInspections = [newInspection, ...mockInspections];

  return newInspection;
};

export const MOCK_INSPECTION_DEFAULTS = {
  vehicleId: MOCK_VEHICLE.id,
  operatorId: MOCK_OPERATOR_ID,
};
