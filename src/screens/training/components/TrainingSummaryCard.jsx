import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Card, StatusBadge } from '../../../components/common';
import { colors, spacing } from '../../../theme';
import { formatDate } from '../../../utils/format/date';
import { getStatusBadge } from '../utils/trainingStatus';

export default function TrainingSummaryCard({ training }) {
  const statusBadge = training?.status ? getStatusBadge(training.status) : null;
  const isInReview = training?.status?.toUpperCase() === 'IN_REVIEW';
  const expiryLabel = training?.expiryDate ? formatDate(training.expiryDate) : null;

  return (
    <Card comfortable style={styles.card}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <Text style={styles.eyebrow}>Training</Text>
          {statusBadge ? (
            <StatusBadge label={statusBadge.label} status={statusBadge.status} />
          ) : null}
        </View>
        <Text style={styles.title}>{training.type}</Text>
      </View>

      {training.description ? (
        <Text style={styles.description}>{training.description}</Text>
      ) : null}

      {expiryLabel ? (
        <View style={styles.expiryRow}>
          <Text style={styles.expiryLabel}>Expires</Text>
          <Text style={styles.expiryValue}>{expiryLabel}</Text>
        </View>
      ) : null}

      {isInReview ? (
        <View style={styles.reviewBanner}>
          <Text style={styles.reviewText}>
            Your certificate is being reviewed by your fleet manager.
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
  expiryRow: {
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
  expiryLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.slate[600],
  },
  expiryValue: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.slate[900],
    textAlign: 'right',
  },
  reviewBanner: {
    marginTop: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.info[100],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.info[200],
  },
  reviewText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.info[700],
    fontWeight: '500',
  },
});
