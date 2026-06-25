import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Card, StatusBadge } from '../../../components/common';
import { colors, spacing } from '../../../theme';
import { formatDateTime } from '../../../utils/format/date';
import {
  formatInspectionScore,
  getInspectionCounts,
  getInspectionOutcomeBadge,
} from '../utils/inspectionStatus';

export default function InspectionSummaryCard({ inspection }) {
  const { passedCount, failedCount, totalCount } = getInspectionCounts(inspection);
  const hasFailures = failedCount > 0;
  const outcome = getInspectionOutcomeBadge(inspection);
  const scoreLabel = formatInspectionScore(inspection.score);

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
        <Text style={styles.panelLabel}>Vehicle</Text>
        <Text style={styles.plateNumber}>{inspection.vehicleName}</Text>
      </View>

      <View style={styles.completedRow}>
        <Text style={styles.completedLabel}>Inspected</Text>
        <Text style={styles.completedValue}>
          {formatDateTime(inspection.inspectionDate)}
        </Text>
      </View>

      {scoreLabel ? (
        <View style={styles.scoreRow}>
          <Text style={styles.scoreLabel}>Score</Text>
          <Text style={styles.scoreValue}>{scoreLabel}</Text>
        </View>
      ) : null}

      <View style={styles.statsBlock}>
        <Text style={styles.statsLabel}>Results</Text>
        <View style={styles.badgeRow}>
          {passedCount > 0 ? (
            <StatusBadge label={`${passedCount} passed`} status="active" />
          ) : null}
          <StatusBadge
            label={`${failedCount} failed`}
            status={hasFailures ? 'pending' : 'inactive'}
          />
          {totalCount > 0 ? (
            <StatusBadge label={`${totalCount} total`} status="inactive" />
          ) : null}
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
  },
  completedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
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
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    backgroundColor: colors.primary[50],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary[100],
  },
  scoreLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.primary[800],
  },
  scoreValue: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '800',
    color: colors.slate[900],
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
