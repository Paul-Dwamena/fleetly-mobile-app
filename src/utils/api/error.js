export const getApiError = (error) => {
  const data = error?.response?.data;

  if (typeof data === 'string') {
    return data;
  }

  if (data?.message) {
    return data.message;
  }

  if (data?.error) {
    return data.error;
  }

  if (error?.message) {
    return error.message;
  }

  return 'Something went wrong. Please try again.';
};
