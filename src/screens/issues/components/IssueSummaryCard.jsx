import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Card, StatusBadge } from '../../../components/common';
import { colors, spacing } from '../../../theme';
import { formatDateTime } from '../../../utils/format/date';
import {
  getPriorityBadge,
  getStatusBadge,
  getStatusBannerStyle,
  getStatusMessage,
} from '../utils/issueStatus';

export default function IssueSummaryCard({ issue }) {
  const statusBadge = issue?.status ? getStatusBadge(issue.status) : null;
  const priorityBadge = issue?.priority ? getPriorityBadge(issue.priority) : null;
  const reportedLabel = issue?.reportedAt
    ? formatDateTime(issue.reportedAt)
    : null;
  const statusMessage = getStatusMessage(issue?.status);
  const bannerStyle = getStatusBannerStyle(issue?.status);

  return (
    <Card comfortable style={styles.card}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <Text style={styles.eyebrow}>Issue</Text>
          {statusBadge ? (
            <StatusBadge label={statusBadge.label} status={statusBadge.status} />
          ) : null}
        </View>
        <Text style={styles.title}>{issue.description}</Text>
      </View>

      <View style={styles.platePanel}>
        <Text style={styles.panelLabel}>Vehicle</Text>
        <Text style={styles.plateNumber}>{issue.vehicleName}</Text>
      </View>

      {reportedLabel ? (
        <View style={styles.reportedRow}>
          <Text style={styles.reportedLabel}>Reported</Text>
          <Text style={styles.reportedValue}>{reportedLabel}</Text>
        </View>
      ) : null}

      {priorityBadge ? (
        <View style={styles.priorityBlock}>
          <Text style={styles.priorityLabel}>Priority</Text>
          <View style={styles.badgeRow}>
            <StatusBadge
              label={priorityBadge.label}
              status={priorityBadge.status}
            />
          </View>
        </View>
      ) : null}

      {statusMessage ? (
        <View
          style={[
            styles.statusBanner,
            {
              backgroundColor: bannerStyle.backgroundColor,
              borderColor: bannerStyle.borderColor,
            },
          ]}
        >
          <Text style={[styles.statusText, { color: bannerStyle.textColor }]}>
            {statusMessage}
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
  reportedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    backgroundColor: colors.slate[100],
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.slate[200],
  },
  reportedLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.slate[600],
    flexShrink: 0,
  },
  reportedValue: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.slate[900],
    textAlign: 'right',
  },
  priorityBlock: {
    paddingTop: spacing.md,
    marginBottom: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.slate[200],
  },
  priorityLabel: {
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
  statusBanner: {
    marginTop: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 12,
    borderWidth: 1,
  },
  statusText: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: '500',
  },
});
