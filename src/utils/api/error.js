function formatValidationErrors(errors) {
  if (!errors) {
    return null;
  }

  if (Array.isArray(errors)) {
    const messages = errors
      .map((item) => {
        if (typeof item === 'string') {
          return item;
        }

        if (item?.message) {
          return item.message;
        }

        if (item?.defaultMessage) {
          return item.defaultMessage;
        }

        return null;
      })
      .filter(Boolean);

    if (messages.length > 0) {
      return messages.join('\n');
    }
  }

  if (typeof errors === 'object') {
    const messages = Object.values(errors)
      .flat()
      .filter((item) => typeof item === 'string');

    if (messages.length > 0) {
      return messages.join('\n');
    }
  }

  return null;
}

export const getApiError = (error) => {
  const data = error?.response?.data;

  if (typeof data === 'string' && data.trim()) {
    return data;
  }

  const validationMessage = formatValidationErrors(data?.errors);
  if (validationMessage) {
    return validationMessage;
  }

  if (data?.message) {
    return data.message;
  }

  if (data?.error) {
    return typeof data.error === 'string' ? data.error : data.error.message;
  }

  if (error?.message && !error.message.startsWith('Request failed with status code')) {
    return error.message;
  }

  return 'Something went wrong. Please try again.';
};
