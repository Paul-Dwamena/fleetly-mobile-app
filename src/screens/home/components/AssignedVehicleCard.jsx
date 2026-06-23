import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card, StatusBadge } from '../../../components/common';
import { colors, spacing, typography } from '../../../theme';

function getVehicleStatusBadge(status) {
  const normalized = status?.toLowerCase();

  if (normalized === 'active') {
    return { label: 'Active', status: 'active' };
  }

  if (normalized === 'maintenance' || normalized === 'in_maintenance') {
    return { label: 'In maintenance', status: 'pending' };
  }

  return { label: status || 'Unknown', status: 'inactive' };
}

export default function AssignedVehicleCard({ vehicle }) {
  const vehicleBadge = vehicle ? getVehicleStatusBadge(vehicle.status) : null;
  const vehicleLabel = [vehicle?.make, vehicle?.model].filter(Boolean).join(' ');

  return (
    <Card comfortable style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleGroup}>
          <View style={styles.iconWrap}>
            <Icon name="car-sport" size={26} color={colors.primary[700]} />
          </View>
          <Text style={styles.sectionTitle}>Your vehicle</Text>
        </View>
        {vehicleBadge ? (
          <StatusBadge
            label={vehicleBadge.label}
            status={vehicleBadge.status}
            size="large"
          />
        ) : null}
      </View>

      {vehicle ? (
        <View style={styles.body}>
          <View style={styles.platePanel}>
            <Text style={styles.plateLabel}>Registration plate</Text>
            <Text style={styles.plateNumber} accessibilityRole="text">
              {vehicle.plateNumber}
            </Text>
          </View>

          {vehicleLabel ? (
            <View style={styles.detailRow}>
              <Icon name="information-circle-outline" size={20} color={colors.slate[500]} />
              <Text style={styles.vehicleDetails}>{vehicleLabel}</Text>
            </View>
          ) : null}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <View style={styles.emptyIconWrap}>
            <Icon name="car-outline" size={28} color={colors.slate[400]} />
          </View>
          <Text style={styles.emptyTitle}>No vehicle assigned</Text>
          <Text style={styles.emptyText}>
            Contact your fleet manager if you need a vehicle for your route.
          </Text>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
    minWidth: 0,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.primary[50],
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary[100],
  },
  sectionTitle: {
    fontSize: 19,
    lineHeight: 24,
    fontWeight: '700',
    color: colors.slate[900],
    flexShrink: 1,
  },
  body: {
    gap: spacing.lg,
  },
  platePanel: {
    backgroundColor: colors.primary[50],
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primary[100],
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  plateLabel: {
    ...typography.bodySmall,
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary[800],
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: spacing.sm,
  },
  plateNumber: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
    color: colors.slate[900],
    letterSpacing: 1.5,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  vehicleDetails: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.slate[700],
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  emptyIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.slate[100],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '700',
    color: colors.slate[800],
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.slate[600],
    textAlign: 'center',
  },
});
