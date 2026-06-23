const delay = (ms = 600) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const MOCK_ISSUE_DEFAULTS = {
  vehicleId: '40c92787-b437-44f0-ac88-97b7e5353c88',
  vehiclePlate: 'GR-4521-21',
  reportedByType: 'DRIVER',
};

let mockIssues = [
  {
    id: '75be442e-1144-404b-8528-8a5093e2f4af',
    vehicleId: MOCK_ISSUE_DEFAULTS.vehicleId,
    vehiclePlate: MOCK_ISSUE_DEFAULTS.vehiclePlate,
    description: 'Brake pads worn out, needs immediate replacement',
    priority: 'MEDIUM',
    status: 'OPEN',
    reportedAt: '2026-06-19T14:20:00',
  },
  {
    id: 'issue-002',
    vehicleId: MOCK_ISSUE_DEFAULTS.vehicleId,
    vehiclePlate: MOCK_ISSUE_DEFAULTS.vehiclePlate,
    description: 'Left indicator light not working',
    priority: 'LOW',
    status: 'IN_PROGRESS',
    reportedAt: '2026-06-17T09:15:00',
  },
];

export const mockMyIssues = async () => {
  await delay();
  return mockIssues.map((issue) => ({
    id: issue.id,
    vehiclePlate: issue.vehiclePlate,
    description: issue.description,
    priority: issue.priority,
    status: issue.status,
    reportedAt: issue.reportedAt,
  }));
};

export const mockIssue = async (issueId) => {
  await delay();

  const issue = mockIssues.find((item) => item.id === issueId);

  if (!issue) {
    throw new Error('Issue not found.');
  }

  return issue;
};

export const mockCreateIssue = async (data) => {
  await delay();

  const newIssue = {
    id: `issue-${Date.now()}`,
    vehicleId: data.vehicleId,
    vehiclePlate: MOCK_ISSUE_DEFAULTS.vehiclePlate,
    description: data.description.trim(),
    priority: data.priority,
    status: 'OPEN',
    reportedAt: new Date().toISOString(),
    reportedByType: data.reportedByType ?? MOCK_ISSUE_DEFAULTS.reportedByType,
  };

  mockIssues = [newIssue, ...mockIssues];

  return newIssue;
};
