const delay = (ms = 600) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

let mockTrainings = [
  {
    id: '54a2169f-a9cc-4597-9405-7b895845c6d9',
    type: 'Defensive Driving Refresher',
    description:
      'Annual mandatory course covering safe driving techniques, hazard awareness, and emergency procedures.',
    status: 'ASSIGNED',
    expiryDate: '2026-06-25',
    issueDate: null,
    completionDate: null,
    certificateUrl: null,
  },
  {
    id: 'training-002',
    type: 'First Aid Basics',
    description:
      'Learn essential first aid skills for roadside emergencies.',
    status: 'COMPLETED',
    expiryDate: '2028-05-01',
    issueDate: '2026-05-01',
    completionDate: '2026-05-28',
    certificateUrl:
      'https://example.com/certificates/first-aid-basics-cert.pdf',
  },
  {
    id: 'training-003',
    type: 'Fleet Policy Update 2026',
    description:
      'Review updated company policies on vehicle use, reporting, and driver conduct.',
    status: 'IN_REVIEW',
    expiryDate: '2028-06-16',
    issueDate: '2026-06-16',
    completionDate: '2026-06-16',
    certificateUrl:
      'https://example.com/certificates/fleet-policy-update-2026.pdf',
  },
];

export const mockMyTrainings = async () => {
  await delay();

  return mockTrainings.map((training) => ({
    id: training.id,
    type: training.type,
    status: training.status,
    expiryDate: training.expiryDate,
    completionDate: training.completionDate,
  }));
};

export const mockTraining = async (trainingId) => {
  await delay();

  const training = mockTrainings.find((item) => item.id === trainingId);

  if (!training) {
    throw new Error('Training not found.');
  }

  return training;
};

export const mockCompleteTraining = async (trainingId, data) => {
  await delay();

  const index = mockTrainings.findIndex((item) => item.id === trainingId);

  if (index === -1) {
    throw new Error('Training not found.');
  }

  const training = mockTrainings[index];
  const normalizedStatus = training.status?.toUpperCase();

  if (normalizedStatus === 'IN_REVIEW') {
    throw new Error('This training is already under review.');
  }

  if (normalizedStatus === 'COMPLETED' || normalizedStatus === 'APPROVED') {
    throw new Error('This training is already completed.');
  }

  if (
    !data?.issueDate?.trim() ||
    !data?.expiryDate?.trim() ||
    !data?.completionDate?.trim() ||
    !data?.certificateUrl?.trim()
  ) {
    throw new Error('Please fill in all certificate details.');
  }

  const updated = {
    ...training,
    status: 'IN_REVIEW',
    issueDate: data.issueDate.trim(),
    expiryDate: data.expiryDate.trim(),
    completionDate: data.completionDate.trim(),
    certificateUrl: data.certificateUrl.trim(),
  };

  mockTrainings[index] = updated;

  return updated;
};
