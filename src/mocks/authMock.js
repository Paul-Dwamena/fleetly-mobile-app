const MOCK_PASSWORD = '123456';

const delay = (ms = 600) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const mockLogin = async (email, password) => {
  await delay();

  if (password !== MOCK_PASSWORD) {
    throw new Error('Invalid email or password.');
  }

  return {
    token: 'mock-dev-token',
    user: {
      email,
      firstName: 'Kofi',
      lastName: 'Mensah',
      userType: 'DRIVER',
      driverId: '9d874b48-20d3-469f-a5cc-59e65bf391c4',
    },
  };
};

export const mockChangePassword = async () => {
  await delay();
  return { message: 'Password changed successfully.' };
};
