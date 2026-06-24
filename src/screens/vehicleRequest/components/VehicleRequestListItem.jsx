import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StatusBadge } from '../../../components/common';
import { listItemStyles as styles } from '../../../components/common/listItemStyles';
import { colors, spacing } from '../../../theme';
import { formatDateTime } from '../../../utils/format/date';
import { getStatusBadge } from '../utils/vehicleRequestStatus';

function LabeledPill({ label, badgeLabel, status }) {
  return (
    <View style={localStyles.labeledPill}>
      <Text style={localStyles.inlineLabel}>{label}</Text>
      <StatusBadge size="compact" label={badgeLabel} status={status} />
    </View>
  );
}

export default function VehicleRequestListItem({ request, onPress, isLast = false }) {
  const statusBadge = getStatusBadge(request.status);

  return (
    <TouchableOpacity
      style={[styles.row, isLast && styles.rowLast]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {request.reason}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {request.vehicleName} · {formatDateTime(request.createdAt)}
        </Text>
        <View style={[styles.badgeRow, localStyles.metricsRow]}>
          <LabeledPill
            label="Status:"
            badgeLabel={statusBadge.label}
            status={statusBadge.status}
          />
        </View>
      </View>
      <Icon name="chevron-forward" size={18} color={colors.slate[400]} />
    </TouchableOpacity>
  );
}

const localStyles = StyleSheet.create({
  metricsRow: {
    alignItems: 'center',
  },
  labeledPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  inlineLabel: {
    fontSize: 13,
    lineHeight: 18,
    color: colors.slate[500],
    fontWeight: '600',
  },
});
