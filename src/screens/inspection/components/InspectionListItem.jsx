import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StatusBadge } from '../../../components/common';
import { listItemStyles as styles } from '../../../components/common/listItemStyles';
import { colors, spacing } from '../../../theme';
import { formatDateTime } from '../../../utils/format/date';
import {
  formatInspectionScore,
  getInspectionStatusBadge,
} from '../utils/inspectionStatus';

function LabeledPill({ label, badgeLabel, status }) {
  return (
    <View style={localStyles.labeledPill}>
      <Text style={localStyles.inlineLabel}>{label}</Text>
      <StatusBadge size="compact" label={badgeLabel} status={status} />
    </View>
  );
}

export default function InspectionListItem({ inspection, onPress, isLast = false }) {
  const scoreLabel = formatInspectionScore(inspection.score);
  const statusBadge = getInspectionStatusBadge(inspection.status);
  const issueCount = inspection.issueCount ?? 0;

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
          {inspection.vehicleName} · {formatDateTime(inspection.inspectionDate)}
        </Text>

        <View style={[styles.badgeRow, localStyles.metricsRow]}>
          {issueCount > 0 ? (
            <StatusBadge
              size="compact"
              label={`${issueCount} issue${issueCount === 1 ? '' : 's'} found`}
              status="pending"
            />
          ) : null}

          {scoreLabel ? (
            <LabeledPill label="Score:" badgeLabel={scoreLabel} status="inactive" />
          ) : null}

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
