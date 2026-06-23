import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Card } from '../../../components/common';
import { colors, spacing } from '../../../theme';

export default function ReportIssueIntroCard({ vehiclePlate }) {
  return (
    <Card comfortable style={styles.card}>
      <Text style={styles.eyebrow}>Report issue</Text>
      <Text style={styles.description}>
        Describe the problem clearly so your fleet manager can help quickly.
      </Text>

      <View style={styles.platePanel}>
        <Text style={styles.panelLabel}>Vehicle plate</Text>
        <Text style={styles.plateNumber}>{vehiclePlate}</Text>
      </View>
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
  platePanel: {
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
  plateNumber: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '800',
    color: colors.slate[900],
    letterSpacing: 1,
  },
});
