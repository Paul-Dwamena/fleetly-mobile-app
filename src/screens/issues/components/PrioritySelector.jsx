import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing } from '../../../theme';

const PRIORITIES = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
];

const PRIORITY_STYLES = {
  LOW: {
    backgroundColor: colors.slate[100],
    textColor: colors.slate[700],
    borderColor: colors.slate[300],
  },
  MEDIUM: {
    backgroundColor: colors.warning[100],
    textColor: colors.warning[700],
    borderColor: '#fde68a',
  },
  HIGH: {
    backgroundColor: colors.danger[100],
    textColor: colors.danger[700],
    borderColor: '#fecaca',
  },
};

export default function PrioritySelector({ value, onChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Priority</Text>
      <View style={styles.row}>
        {PRIORITIES.map((priority) => {
          const isActive = value === priority.value;
          const statusStyle = PRIORITY_STYLES[priority.value];

          return (
            <TouchableOpacity
              key={priority.value}
              style={[
                styles.button,
                isActive
                  ? {
                      backgroundColor: statusStyle.backgroundColor,
                      borderColor: statusStyle.borderColor,
                    }
                  : styles.buttonInactive,
              ]}
              onPress={() => onChange(priority.value)}
              activeOpacity={0.85}
            >
              <Text
                style={[
                  styles.buttonText,
                  isActive
                    ? { color: statusStyle.textColor }
                    : styles.buttonTextInactive,
                  isActive && styles.buttonTextActive,
                ]}
              >
                {priority.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.slate[800],
    marginBottom: spacing.sm,
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  button: {
    flex: 1,
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonInactive: {
    backgroundColor: colors.white,
    borderColor: colors.slate[300],
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
  buttonTextActive: {
    fontWeight: '700',
  },
  buttonTextInactive: {
    color: colors.slate[700],
  },
});
