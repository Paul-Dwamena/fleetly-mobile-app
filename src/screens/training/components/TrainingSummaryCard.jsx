import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Card, StatusBadge } from '../../../components/common';
import { colors, spacing } from '../../../theme';
import { formatDate } from '../../../utils/format/date';
import { getStatusBadge } from '../utils/trainingStatus';

export default function TrainingSummaryCard({ training }) {
  const statusBadge = training?.status ? getStatusBadge(training.status) : null;
  const scheduledLabel = training?.scheduledDate
    ? formatDate(training.scheduledDate)
    : null;
  const completionLabel = training?.completionDate
    ? formatDate(training.completionDate)
    : null;
  const isCompleted = ['COMPLETED', 'APPROVED'].includes(
    training?.status?.toUpperCase(),
  );

  return (
    <Card comfortable style={styles.card}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <Text style={styles.eyebrow}>Training</Text>
          {statusBadge ? (
            <StatusBadge label={statusBadge.label} status={statusBadge.status} />
          ) : null}
        </View>
        <Text style={styles.title}>{training.trainingName}</Text>
      </View>

      {training.instructor ? (
        <Text style={styles.description}>Instructor: {training.instructor}</Text>
      ) : null}

      {training.location ? (
        <View style={styles.infoPanel}>
          <Text style={styles.panelLabel}>Location</Text>
          <Text style={styles.panelValue}>{training.location}</Text>
        </View>
      ) : null}

      {scheduledLabel ? (
        <View style={styles.dateRow}>
          <Text style={styles.dateLabel}>Scheduled</Text>
          <Text style={styles.dateValue}>{scheduledLabel}</Text>
        </View>
      ) : null}

      {completionLabel ? (
        <View style={styles.dateRow}>
          <Text style={styles.dateLabel}>Completed</Text>
          <Text style={styles.dateValue}>{completionLabel}</Text>
        </View>
      ) : null}

      {isCompleted ? (
        <View style={styles.completeBanner}>
          <Text style={styles.completeText}>
            You have completed this training course.
          </Text>
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
  },
  header: {
    marginBottom: spacing.sm,
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
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.slate[600],
    marginBottom: spacing.md,
  },
  infoPanel: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
    backgroundColor: colors.primary[50],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary[200],
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
  panelValue: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    color: colors.slate[900],
  },
  dateRow: {
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
  dateLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.slate[600],
    flexShrink: 0,
  },
  dateValue: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.slate[900],
    textAlign: 'right',
  },
  completeBanner: {
    marginTop: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.success[100],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primary[200],
  },
  completeText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.success[700],
    fontWeight: '500',
  },
});
