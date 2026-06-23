const delay = (ms = 600) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

const UNASSIGNED_VEHICLES = [
  {
    id: 'db997ad3-8fb7-44dd-8c75-88d2aec4dd65',
    plateNumber: 'GR-8820-19',
    make: 'Toyota',
    model: 'Hiace',
  },
  {
    id: 'vehicle-unassigned-002',
    plateNumber: 'GR-3310-44',
    make: 'Nissan',
    model: 'Urvan',
  },
];

let mockVehicleRequests = [
  {
    id: 'vreq-001',
    vehicleId: 'db997ad3-8fb7-44dd-8c75-88d2aec4dd65',
    vehiclePlate: 'GR-8820-19',
    vehicleMake: 'Toyota',
    vehicleModel: 'Hiace',
    reason: 'Assigned vehicle in workshop for brake repair.',
    status: 'PENDING',
    requestedAt: '2026-06-18T11:00:00',
  },
];

export const mockMyVehicleRequests = async () => {
  await delay();

  return mockVehicleRequests.map((request) => ({
    id: request.id,
    vehicleId: request.vehicleId,
    vehiclePlate: request.vehiclePlate,
    vehicleMake: request.vehicleMake,
    vehicleModel: request.vehicleModel,
    reason: request.reason,
    status: request.status,
    requestedAt: request.requestedAt,
  }));
};

export const mockVehicleRequest = async (requestId) => {
  await delay();

  const request = mockVehicleRequests.find((item) => item.id === requestId);

  if (!request) {
    throw new Error('Vehicle request not found.');
  }

  return request;
};

export const mockUnassignedVehicles = async () => {
  await delay();
  return UNASSIGNED_VEHICLES;
};

export const mockSubmitVehicleRequest = async (data) => {
  await delay();

  if (!data?.vehicleId?.trim()) {
    throw new Error('Please select a vehicle.');
  }

  if (!data?.reason?.trim()) {
    throw new Error('Please explain why you need this vehicle.');
  }

  const vehicle = UNASSIGNED_VEHICLES.find((item) => item.id === data.vehicleId);

  if (!vehicle) {
    throw new Error('Selected vehicle is no longer available.');
  }

  const newRequest = {
    id: `vreq-${Date.now()}`,
    vehicleId: vehicle.id,
    vehiclePlate: vehicle.plateNumber,
    vehicleMake: vehicle.make,
    vehicleModel: vehicle.model,
    reason: data.reason.trim(),
    status: 'PENDING',
    requestedAt: new Date().toISOString(),
  };

  mockVehicleRequests = [newRequest, ...mockVehicleRequests];

  return newRequest;
};
