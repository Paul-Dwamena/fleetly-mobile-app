import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../../theme';

const statusStyles = {
  active: {
    backgroundColor: colors.success[100],
    textColor: colors.success[700],
    borderColor: colors.primary[200],
  },
  pending: {
    backgroundColor: colors.warning[100],
    textColor: colors.warning[700],
    borderColor: '#fde68a',
  },
  inactive: {
    backgroundColor: colors.slate[100],
    textColor: colors.slate[600],
    borderColor: colors.slate[200],
  },
  danger: {
    backgroundColor: colors.danger[100],
    textColor: colors.danger[700],
    borderColor: '#fecaca',
  },
  review: {
    backgroundColor: colors.info[100],
    textColor: colors.info[700],
    borderColor: colors.info[200],
  },
};

export default function StatusBadge({ label, status = 'active', size = 'default' }) {
  const badgeStyle = statusStyles[status] || statusStyles.inactive;
  const isLarge = size === 'large';
  const isCompact = size === 'compact';

  return (
    <View
      style={[
        styles.badge,
        isLarge && styles.badgeLarge,
        isCompact && styles.badgeCompact,
        {
          backgroundColor: badgeStyle.backgroundColor,
          borderColor: badgeStyle.borderColor,
        },
      ]}
    >
      <Text
        style={[
          styles.text,
          isLarge && styles.textLarge,
          isCompact && styles.textCompact,
          { color: badgeStyle.textColor },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  badgeLarge: {
    paddingHorizontal: spacing.lg,
    paddingVertical: 6,
  },
  badgeCompact: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  text: {
    ...typography.caption,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  textLarge: {
    fontSize: 14,
    lineHeight: 18,
    fontWeight: '700',
  },
  textCompact: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '600',
  },
});
