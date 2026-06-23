import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Card, StatusBadge } from '../../../components/common';
import { colors, spacing } from '../../../theme';

export default function InspectionFormSummaryCard({ template }) {
  const itemCount = template?.items?.length ?? template?.itemCount ?? 0;

  return (
    <Card comfortable style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.eyebrow}>Complete inspection</Text>
        <StatusBadge
          size="compact"
          label={`${itemCount} items`}
          status="active"
        />
      </View>
      <Text style={styles.title}>{template?.name}</Text>
      {template?.description ? (
        <Text style={styles.description}>{template.description}</Text>
      ) : null}
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
  title: {
    fontSize: 19,
    lineHeight: 26,
    fontWeight: '700',
    color: colors.slate[900],
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.slate[600],
  },
});
