import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Card } from '../../../components/common';
import { colors, spacing } from '../../../theme';

export default function ReportAccidentIntroCard({ vehicleName }) {
  return (
    <Card comfortable style={styles.card}>
      <Text style={styles.eyebrow}>Report accident</Text>
      <Text style={styles.description}>
        Provide accurate details about the incident so your fleet manager can
        respond quickly.
      </Text>

      {vehicleName ? (
        <View style={styles.vehiclePanel}>
          <Text style={styles.panelLabel}>Vehicle</Text>
          <Text style={styles.vehicleName}>{vehicleName}</Text>
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
  },
  eyebrow: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '700',
    color: colors.primary[800],
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.slate[600],
    marginBottom: spacing.lg,
  },
  vehiclePanel: {
    backgroundColor: colors.primary[50],
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.primary[100],
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
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
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    color: colors.slate[900],
  },
});
