import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, typography } from '../../../theme';

export default function ProfileDetailRow({ icon, label, value, isLast = false }) {
  return (
    <View style={[styles.row, isLast && styles.rowLast]}>
      <View style={styles.labelRow}>
        {icon ? (
          <Icon name={icon} size={18} color={colors.slate[500]} />
        ) : null}
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value || '—'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.slate[200],
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  label: {
    ...typography.caption,
    color: colors.slate[500],
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  value: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.slate[900],
    fontWeight: '500',
  },
  rowLast: {
    borderBottomWidth: 0,
  },
});
