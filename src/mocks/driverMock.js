const delay = (ms = 600) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

/**
 * Mock shape for GET /drivers/me/overview.
 * Adjust field mapping in HomeScreen when the real API response is confirmed.
 */
export const mockDriverOverview = async () => {
  await delay();

  return {
    driverName: 'Kofi Mensah',
    company: {
      name: 'Metro Transit Fleet',
      logoUrl: null,
    },
    assignedVehicle: {
      id: 'a461b17c-32e7-4240-a770-18f737f9256b',
      plateNumber: 'GR-4521-21',
      make: 'Toyota',
      model: 'Hiace',
      status: 'ACTIVE',
    },
    summary: {
      inspectionsDue: 1,
      openIssues: 2,
      pendingTrainings: 1,
      vehicleRequests: 1,
    },
  };
};

/**
 * Mock shape for GET /drivers/me/profile.
 * Adjust field mapping in ProfileScreen when the real API response is confirmed.
 */
export const mockDriverProfile = async () => {
  await delay();

  return {
    firstName: 'Kofi',
    lastName: 'Mensah',
    email: 'kofi.mensah@example.com',
    contactNumber: '+233 24 123 4567',
    licenseNumber: 'DL-458921',
    licenseExpiry: '2026-08-12',
    status: 'active',
    branch: 'Accra Central',
    dateOfBirth: '1990-05-15',
    company: {
      name: 'Metro Transit Fleet',
    },
  };
};
