import { colors } from '../../../theme';

export function getStatusBadge(status) {
  const normalized = status?.toUpperCase();

  if (normalized === 'REPORTED') {
    return { label: 'Reported', status: 'review' };
  }

  if (normalized === 'UNDER_INVESTIGATION' || normalized === 'INVESTIGATING') {
    return { label: 'Investigating', status: 'pending' };
  }

  if (normalized === 'CLOSED' || normalized === 'RESOLVED') {
    return { label: 'Closed', status: 'inactive' };
  }

  return { label: status || 'Unknown', status: 'inactive' };
}

export function getSeverityBadge(severity) {
  const normalized = severity?.toUpperCase();

  if (normalized === 'CRITICAL' || normalized === 'FATAL') {
    return { label: 'Critical', status: 'danger' };
  }

  if (normalized === 'MAJOR' || normalized === 'SEVERE') {
    return { label: 'Major', status: 'danger' };
  }

  if (normalized === 'MODERATE') {
    return { label: 'Moderate', status: 'pending' };
  }

  return { label: 'Minor', status: 'inactive' };
}

export function getStatusMessage(status) {
  const normalized = status?.toUpperCase();

  if (normalized === 'UNDER_INVESTIGATION' || normalized === 'INVESTIGATING') {
    return 'Your fleet manager is investigating this accident.';
  }

  if (normalized === 'CLOSED' || normalized === 'RESOLVED') {
    return 'This accident case has been closed.';
  }

  return 'Your accident report has been submitted to your fleet manager.';
}

export function getStatusBannerStyle(status) {
  const normalized = status?.toUpperCase();

  if (normalized === 'UNDER_INVESTIGATION' || normalized === 'INVESTIGATING') {
    return {
      backgroundColor: colors.info[100],
      borderColor: colors.info[200],
      textColor: colors.info[700],
    };
  }

  if (normalized === 'CLOSED' || normalized === 'RESOLVED') {
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
