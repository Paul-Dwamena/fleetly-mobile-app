import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Card, StatusBadge } from '../../../components/common';
import { colors, spacing } from '../../../theme';
import { formatDateTime } from '../../../utils/format/date';
import { getStatusBadge } from '../utils/vehicleRequestStatus';

function getStatusMessage(status) {
  const normalized = status?.toUpperCase();

  if (normalized === 'APPROVED') {
    return 'Your fleet manager approved this vehicle request.';
  }

  if (normalized === 'REJECTED') {
    return 'Your fleet manager declined this vehicle request.';
  }

  if (normalized === 'IN_REVIEW') {
    return 'Your fleet manager is reviewing this request.';
  }

  return 'Your request is waiting for review by your fleet manager.';
}

function getStatusBannerStyle(status) {
  const normalized = status?.toUpperCase();

  if (normalized === 'APPROVED') {
    return {
      backgroundColor: colors.success[100],
      borderColor: colors.primary[200],
      textColor: colors.success[700],
    };
  }

  if (normalized === 'REJECTED') {
    return {
      backgroundColor: colors.danger[100],
      borderColor: '#fecaca',
      textColor: colors.danger[700],
    };
  }

  if (normalized === 'IN_REVIEW') {
    return {
      backgroundColor: colors.info[100],
      borderColor: colors.info[200],
      textColor: colors.info[700],
    };
  }

  return {
    backgroundColor: colors.warning[100],
    borderColor: '#fde68a',
    textColor: colors.warning[700],
  };
}

export default function VehicleRequestSummaryCard({ request }) {
  const statusBadge = request?.status ? getStatusBadge(request.status) : null;
  const submittedLabel = request?.createdAt
    ? formatDateTime(request.createdAt)
    : null;
  const statusMessage = getStatusMessage(request?.status);
  const bannerStyle = getStatusBannerStyle(request?.status);

  return (
    <Card comfortable style={styles.card}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <Text style={styles.eyebrow}>Vehicle request</Text>
          {statusBadge ? (
            <StatusBadge label={statusBadge.label} status={statusBadge.status} />
          ) : null}
        </View>
        <Text style={styles.title}>{request.reason}</Text>
      </View>

      <View style={styles.vehiclePanel}>
        <Text style={styles.panelLabel}>Requested vehicle</Text>
        <Text style={styles.vehicleName}>{request.vehicleName}</Text>
      </View>

      {submittedLabel ? (
        <View style={styles.submittedRow}>
          <Text style={styles.submittedLabel}>Submitted</Text>
          <Text style={styles.submittedValue}>{submittedLabel}</Text>
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
  vehiclePanel: {
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
  vehicleName: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '800',
    color: colors.slate[900],
  },
  submittedRow: {
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
  submittedLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.slate[600],
    flexShrink: 0,
  },
  submittedValue: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.slate[900],
    textAlign: 'right',
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
