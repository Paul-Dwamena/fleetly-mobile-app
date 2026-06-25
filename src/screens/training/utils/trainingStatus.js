export function getStatusBadge(status) {
  const normalized = status?.toUpperCase();

  if (normalized === 'COMPLETED' || normalized === 'APPROVED') {
    return { label: 'Completed', status: 'active' };
  }

  if (normalized === 'IN_REVIEW') {
    return { label: 'In review', status: 'review' };
  }

  if (normalized === 'SCHEDULED') {
    return { label: 'Scheduled', status: 'review' };
  }

  if (normalized === 'OVERDUE') {
    return { label: 'Overdue', status: 'danger' };
  }

  if (normalized === 'EXPIRED') {
    return { label: 'Expired', status: 'danger' };
  }

  if (normalized === 'IN_PROGRESS') {
    return { label: 'In progress', status: 'active' };
  }

  if (normalized === 'ASSIGNED') {
    return { label: 'Assigned', status: 'pending' };
  }

  return { label: status || 'Pending', status: 'pending' };
}

export function canSubmitCompletion(status) {
  const normalized = status?.toUpperCase();
  return !['IN_REVIEW', 'COMPLETED', 'APPROVED'].includes(normalized);
}

export function hasSubmittedDetails(training) {
  return Boolean(training?.completionDate);
}

export function getTodayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}
