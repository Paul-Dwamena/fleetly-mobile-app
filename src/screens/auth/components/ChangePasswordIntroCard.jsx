import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Card } from '../../../components/common';
import { colors, spacing } from '../../../theme';

const TIPS = [
  'Use at least 6 characters',
  'Choose something different from your current password',
  'Enter the same new password in both fields',
];

export default function ChangePasswordIntroCard() {
  return (
    <Card comfortable style={styles.card}>
      <Text style={styles.eyebrow}>Change password</Text>
      <Text style={styles.description}>
        Enter your current password, then choose a new one for your next sign in.
      </Text>

      <View style={styles.tipsPanel}>
        <Text style={styles.panelLabel}>Password requirements</Text>
        {TIPS.map((tip) => (
          <View key={tip} style={styles.tipRow}>
            <Text style={styles.tipBullet}>•</Text>
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
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
  tipsPanel: {
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
    marginBottom: spacing.sm,
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  tipBullet: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.primary[700],
    fontWeight: '700',
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: colors.slate[700],
    fontWeight: '500',
  },
});
