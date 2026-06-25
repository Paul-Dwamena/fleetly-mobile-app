import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Card, StatusBadge } from '../../../components/common';
import { colors, spacing } from '../../../theme';

export default function VehicleRequestIntroCard({ availableCount = 0 }) {
  return (
    <Card comfortable style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.eyebrow}>Vehicle request</Text>
        {availableCount > 0 ? (
          <StatusBadge
            size="compact"
            label={`${availableCount} available`}
            status="active"
          />
        ) : (
          <StatusBadge size="compact" label="None available" status="inactive" />
        )}
      </View>
      <Text style={styles.description}>
        Choose an available vehicle and tell your fleet manager why you need it.
      </Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
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
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.slate[600],
  },
});
