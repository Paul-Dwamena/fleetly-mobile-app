import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StatusBadge } from '../../../components/common';
import { listItemStyles as styles } from '../../../components/common/listItemStyles';
import { colors } from '../../../theme';
import { formatDateTime } from '../../../utils/format/date';

function getStatusBadgeProps(status) {
  const normalized = status?.toUpperCase();

  if (normalized === 'OPEN') {
    return { label: 'Open', status: 'pending' };
  }

  if (normalized === 'IN_PROGRESS') {
    return { label: 'In progress', status: 'active' };
  }

  if (normalized === 'RESOLVED' || normalized === 'CLOSED') {
    return { label: 'Resolved', status: 'inactive' };
  }

  return { label: status || 'Unknown', status: 'inactive' };
}

function getPriorityBadgeProps(priority) {
  const normalized = priority?.toUpperCase();

  if (normalized === 'HIGH') {
    return { label: 'High', status: 'danger' };
  }

  if (normalized === 'MEDIUM') {
    return { label: 'Medium', status: 'pending' };
  }

  return { label: 'Low', status: 'inactive' };
}

export default function IssueListItem({ issue, onPress, isLast = false }) {
  const statusBadge = getStatusBadgeProps(issue.status);
  const priorityBadge = getPriorityBadgeProps(issue.priority);

  return (
    <TouchableOpacity
      style={[styles.row, isLast && styles.rowLast]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {issue.description}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {issue.vehiclePlate} · {formatDateTime(issue.reportedAt)}
        </Text>
        <View style={styles.badgeRow}>
          <StatusBadge
            size="compact"
            label={statusBadge.label}
            status={statusBadge.status}
          />
          <StatusBadge
            size="compact"
            label={priorityBadge.label}
            status={priorityBadge.status}
          />
        </View>
      </View>
      <Icon name="chevron-forward" size={18} color={colors.slate[400]} />
    </TouchableOpacity>
  );
}
