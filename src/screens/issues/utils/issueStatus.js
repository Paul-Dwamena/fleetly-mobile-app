import { colors } from '../../../theme';

export function getStatusBadge(status) {
  const normalized = status?.toUpperCase();

  if (normalized === 'OPEN') {
    return { label: 'Open', status: 'review' };
  }

  if (normalized === 'IN_PROGRESS') {
    return { label: 'In progress', status: 'active' };
  }

  if (normalized === 'RESOLVED' || normalized === 'CLOSED') {
    return { label: 'Resolved', status: 'inactive' };
  }

  return { label: status || 'Unknown', status: 'inactive' };
}

export function getPriorityBadge(priority) {
  const normalized = priority?.toUpperCase();

  if (normalized === 'HIGH') {
    return { label: 'High', status: 'danger' };
  }

  if (normalized === 'MEDIUM') {
    return { label: 'Medium', status: 'pending' };
  }

  return { label: 'Low', status: 'inactive' };
}

export function getStatusMessage(status) {
  const normalized = status?.toUpperCase();

  if (normalized === 'IN_PROGRESS') {
    return 'Your fleet manager is working on this issue.';
  }

  if (normalized === 'RESOLVED' || normalized === 'CLOSED') {
    return 'This issue has been resolved.';
  }

  return 'Your fleet manager has been notified and will review this issue.';
}

export function getStatusBannerStyle(status) {
  const normalized = status?.toUpperCase();

  if (normalized === 'IN_PROGRESS') {
    return {
      backgroundColor: colors.info[100],
      borderColor: colors.info[200],
      textColor: colors.info[700],
    };
  }

  if (normalized === 'RESOLVED' || normalized === 'CLOSED') {
    return {
      backgroundColor: colors.success[100],
      borderColor: colors.primary[200],
      textColor: colors.success[700],
    };
  }

  return {
    backgroundColor: colors.warning[100],
    borderColor: '#fde68a',
    textColor: colors.warning[700],
  };
}
