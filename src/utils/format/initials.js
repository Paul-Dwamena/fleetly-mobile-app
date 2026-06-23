export const getInitials = (name, maxChars = 2) => {
  if (!name?.trim()) {
    return '?';
  }

  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0].slice(0, maxChars).toUpperCase();
  }

  return words
    .slice(0, maxChars)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
};
