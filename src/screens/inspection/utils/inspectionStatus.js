export function getInspectionStatusBadge(status) {
  const normalized = status?.toUpperCase();

  if (normalized === 'FAILED') {
    return { label: 'Failed', status: 'danger' };
  }

  if (normalized === 'PASSED') {
    return { label: 'Passed', status: 'active' };
  }

  return { label: status || 'Unknown', status: 'inactive' };
}

export function getInspectionOutcomeBadge(inspection) {
  const normalized = inspection?.status?.toUpperCase();

  if (normalized === 'FAILED' || (inspection?.issueCount ?? 0) > 0) {
    return { label: 'Issues found', status: 'pending' };
  }

  if (normalized === 'PASSED') {
    return { label: 'All passed', status: 'active' };
  }

  return getInspectionStatusBadge(inspection?.status);
}

export function getInspectionCounts(inspection) {
  const items = inspection?.items ?? [];

  if (items.length > 0) {
    const passedCount = items.filter((item) => item.passed).length;
    const failedCount = items.filter((item) => !item.passed).length;

    return {
      passedCount,
      failedCount,
      totalCount: items.length,
    };
  }

  const failedCount = inspection?.issueCount ?? 0;

  return {
    passedCount: 0,
    failedCount,
    totalCount: failedCount,
  };
}

export function formatInspectionScore(score) {
  if (score == null || Number.isNaN(Number(score))) {
    return null;
  }

  return `${Number(score).toFixed(1)}%`;
}
