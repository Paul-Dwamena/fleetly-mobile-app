import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Card, StatusBadge } from '../../../components/common';
import { colors, spacing } from '../../../theme';
import { formatDateTime } from '../../../utils/format/date';

function getOutcomeBadge(hasFailures) {
  if (hasFailures) {
    return { label: 'Issues found', status: 'pending' };
  }

  return { label: 'All passed', status: 'active' };
}

export default function InspectionSummaryCard({ inspection }) {
  const items = inspection?.items ?? [];
  const passedCount = items.filter((item) => item.passed).length;
  const failedCount = items.filter((item) => !item.passed).length;
  const totalCount = items.length;
  const hasFailures = failedCount > 0;
  const outcome = getOutcomeBadge(hasFailures);

  return (
    <Card comfortable style={styles.card}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <Text style={styles.eyebrow}>Inspection</Text>
          <StatusBadge label={outcome.label} status={outcome.status} />
        </View>
        <Text style={styles.title}>{inspection.templateName}</Text>
      </View>

      <View style={styles.platePanel}>
        <Text style={styles.panelLabel}>Vehicle plate</Text>
        <Text style={styles.plateNumber}>{inspection.vehiclePlate}</Text>
      </View>

      <View style={styles.completedRow}>
        <Text style={styles.completedLabel}>Completed</Text>
        <Text style={styles.completedValue}>
          {formatDateTime(inspection.completedAt)}
        </Text>
      </View>

      <View style={styles.statsBlock}>
        <Text style={styles.statsLabel}>Results</Text>
        <View style={styles.badgeRow}>
          <StatusBadge label={`${passedCount} passed`} status="active" />
          <StatusBadge
            label={`${failedCount} failed`}
            status={hasFailures ? 'pending' : 'inactive'}
          />
          <StatusBadge label={`${totalCount} total`} status="inactive" />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
  },
  header: {
    marginBottom: spacing.lg,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  eyebrow: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: colors.primary[800],
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  title: {
    fontSize: 19,
    lineHeight: 26,
    fontWeight: '700',
    color: colors.slate[900],
  },
  platePanel: {
    backgroundColor: colors.primary[50],
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.primary[100],
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  panelLabel: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: colors.primary[800],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.xs,
  },
  plateNumber: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    color: colors.slate[900],
    letterSpacing: 1,
  },
  completedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.slate[100],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.slate[200],
  },
  completedLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.slate[600],
    flexShrink: 0,
  },
  completedValue: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.slate[900],
    textAlign: 'right',
  },
  statsBlock: {
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.slate[200],
  },
  statsLabel: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    color: colors.slate[600],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
});
