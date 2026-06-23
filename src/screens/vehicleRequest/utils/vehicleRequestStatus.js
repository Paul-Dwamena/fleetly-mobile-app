export function getStatusBadge(status) {
  const normalized = status?.toUpperCase();

  if (normalized === 'APPROVED') {
    return { label: 'Approved', status: 'active' };
  }

  if (normalized === 'REJECTED') {
    return { label: 'Rejected', status: 'danger' };
  }

  if (normalized === 'IN_REVIEW') {
    return { label: 'In review', status: 'review' };
  }

  return { label: 'Pending', status: 'pending' };
}

export function formatVehicleLabel(vehicle) {
  if (!vehicle) {
    return '—';
  }

  const details = [vehicle.make, vehicle.model].filter(Boolean).join(' ');
  return details
    ? `${vehicle.plateNumber ?? vehicle.plate} · ${details}`
    : vehicle.plateNumber ?? vehicle.plate ?? '—';
}
