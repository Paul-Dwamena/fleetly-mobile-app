import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Card, CompanyLogo, StatusBadge } from '../../../components/common';
import { colors, spacing } from '../../../theme';
import { formatDate } from '../../../utils/format/date';

function getFullName(profile) {
  if (!profile) {
    return 'Driver';
  }

  const name = [profile.firstName, profile.lastName].filter(Boolean).join(' ');

  if (name) {
    return name;
  }

  return profile.email?.split('@')[0] ?? 'Driver';
}

export function getStatusBadge(status) {
  const normalized = status?.toLowerCase();

  if (normalized === 'active') {
    return { label: 'Active', status: 'active' };
  }

  if (normalized === 'on_leave' || normalized === 'on leave') {
    return { label: 'On leave', status: 'pending' };
  }

  if (normalized === 'inactive') {
    return { label: 'Inactive', status: 'inactive' };
  }

  return { label: status || 'Unknown', status: 'inactive' };
}

export default function ProfileSummaryCard({ profile, authUser }) {
  const statusBadge = authUser?.status ? getStatusBadge(authUser.status) : null;
  const licenseExpiryLabel = profile?.licenseExpiryDate
    ? formatDate(profile.licenseExpiryDate)
    : null;
  const driverName = getFullName(profile);

  return (
    <Card comfortable style={styles.card}>
      <View style={styles.header}>
        <View style={styles.topRow}>
          <Text style={styles.eyebrow}>Driver profile</Text>
          {statusBadge ? (
            <StatusBadge label={statusBadge.label} status={statusBadge.status} />
          ) : null}
        </View>
      </View>

      <View style={styles.profileRow}>
        <CompanyLogo companyName={driverName} size={64} />
        <View style={styles.textBlock}>
          <Text style={styles.name}>{driverName}</Text>
          <Text style={styles.email} numberOfLines={2}>
            {profile?.email ?? '—'}
          </Text>
        </View>
      </View>

      {profile?.employeeNumber ? (
        <View style={styles.infoPanel}>
          <Text style={styles.panelLabel}>Employee number</Text>
          <Text style={styles.panelValue} numberOfLines={1}>
            {profile.employeeNumber}
          </Text>
        </View>
      ) : null}

      {licenseExpiryLabel ? (
        <View style={styles.expiryRow}>
          <Text style={styles.expiryLabel}>License expires</Text>
          <Text style={styles.expiryValue}>{licenseExpiryLabel}</Text>
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
    marginBottom: spacing.md,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  eyebrow: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: colors.primary[800],
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  textBlock: {
    flex: 1,
    minWidth: 0,
  },
  name: {
    fontSize: 19,
    lineHeight: 26,
    fontWeight: '700',
    color: colors.slate[900],
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.slate[600],
    fontWeight: '500',
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
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '700',
    color: colors.slate[900],
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
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
});
