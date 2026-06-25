import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing } from '../../../theme';

const SEVERITIES = [
  { value: 'MINOR', label: 'Minor' },
  { value: 'MODERATE', label: 'Moderate' },
  { value: 'MAJOR', label: 'Major' },
  { value: 'CRITICAL', label: 'Critical' },
];

const SEVERITY_STYLES = {
  MINOR: {
    backgroundColor: colors.slate[100],
    textColor: colors.slate[700],
    borderColor: colors.slate[300],
  },
  MODERATE: {
    backgroundColor: colors.warning[100],
    textColor: colors.warning[700],
    borderColor: '#fde68a',
  },
  MAJOR: {
    backgroundColor: colors.danger[100],
    textColor: colors.danger[700],
    borderColor: '#fecaca',
  },
  CRITICAL: {
    backgroundColor: colors.danger[100],
    textColor: colors.danger[700],
    borderColor: '#fecaca',
  },
};

export default function SeveritySelector({ value, onChange }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Severity</Text>
      <View style={styles.grid}>
        {SEVERITIES.map((severity) => {
          const isActive = value === severity.value;
          const statusStyle = SEVERITY_STYLES[severity.value];

          return (
            <TouchableOpacity
              key={severity.value}
              style={[
                styles.button,
                isActive
                  ? {
                      backgroundColor: statusStyle.backgroundColor,
                      borderColor: statusStyle.borderColor,
                    }
                  : styles.buttonInactive,
              ]}
              onPress={() => onChange(severity.value)}
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
                {severity.label}
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  button: {
    width: '48%',
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
