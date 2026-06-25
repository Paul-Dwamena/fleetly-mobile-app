import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Card, StatusBadge } from '../../../components/common';
import { colors, spacing } from '../../../theme';
import { formatDateTime } from '../../../utils/format/date';
import {
  getSeverityBadge,
  getStatusBadge,
  getStatusBannerStyle,
  getStatusMessage,
} from '../utils/accidentStatus';

export default function AccidentSummaryCard({ accident }) {
  const statusBadge = accident?.status ? getStatusBadge(accident.status) : null;
  const severityBadge = accident?.severity ? getSeverityBadge(accident.severity) : null;
  const incidentLabel = accident?.incidentDate
    ? formatDateTime(accident.incidentDate)
    : null;
  const statusMessage = getStatusMessage(accident?.status);
  const bannerStyle = getStatusBannerStyle(accident?.status);
  const vehicleName =
    accident?.vehicle?.vehicleName ?? accident?.vehicleName ?? null;
  const plateNumber = accident?.vehicle?.plateNumber ?? null;

  return (
    <Card comfortable style={styles.card}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <Text style={styles.eyebrow}>Accident</Text>
          {statusBadge ? (
            <StatusBadge label={statusBadge.label} status={statusBadge.status} />
          ) : null}
        </View>
        <Text style={styles.title}>{accident.caseNumber}</Text>
        {accident.description ? (
          <Text style={styles.description}>{accident.description}</Text>
        ) : null}
      </View>

      {vehicleName ? (
        <View style={styles.vehiclePanel}>
          <Text style={styles.panelLabel}>Vehicle</Text>
          <Text style={styles.vehicleName}>{vehicleName}</Text>
          {plateNumber ? (
            <Text style={styles.plateNumber}>{plateNumber}</Text>
          ) : null}
        </View>
      ) : null}

      {accident.location ? (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Location</Text>
          <Text style={styles.infoValue}>{accident.location}</Text>
        </View>
      ) : null}

      {incidentLabel ? (
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Incident date</Text>
          <Text style={styles.infoValue}>{incidentLabel}</Text>
        </View>
      ) : null}

      {severityBadge ? (
        <View style={styles.severityBlock}>
          <Text style={styles.severityLabel}>Severity</Text>
          <StatusBadge label={severityBadge.label} status={severityBadge.status} />
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
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.slate[600],
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
  plateNumber: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.slate[600],
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  infoRow: {
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
  infoLabel: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.slate[600],
    flexShrink: 0,
  },
  infoValue: {
    flex: 1,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.slate[900],
    textAlign: 'right',
  },
  severityBlock: {
    paddingTop: spacing.md,
    marginBottom: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.slate[200],
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  severityLabel: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '700',
    color: colors.slate[600],
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
