import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StatusBadge } from '../../../components/common';
import { listItemStyles as styles } from '../../../components/common/listItemStyles';
import { colors } from '../../../theme';
import { formatDateTime } from '../../../utils/format/date';

function getOutcomeBadge(inspection) {
  if (inspection.failedCount > 0) {
    return { label: 'Issues found', status: 'pending' };
  }

  return { label: 'All passed', status: 'active' };
}

export default function InspectionListItem({ inspection, onPress, isLast = false }) {
  const hasFailures = inspection.failedCount > 0;
  const outcome = getOutcomeBadge(inspection);

  return (
    <TouchableOpacity
      style={[styles.row, isLast && styles.rowLast]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {inspection.templateName}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {inspection.vehiclePlate} · {formatDateTime(inspection.completedAt)}
        </Text>
        <View style={styles.badgeRow}>
          <StatusBadge size="compact" label={outcome.label} status={outcome.status} />
          <StatusBadge
            size="compact"
            label={`${inspection.passedCount} passed`}
            status="active"
          />
          <StatusBadge
            size="compact"
            label={`${inspection.failedCount} failed`}
            status={hasFailures ? 'pending' : 'inactive'}
          />
        </View>
      </View>
      <Icon name="chevron-forward" size={18} color={colors.slate[400]} />
    </TouchableOpacity>
  );
}
