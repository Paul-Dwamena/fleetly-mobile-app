import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Input } from '../../../components/common';
import { colors, spacing } from '../../../theme';

function ChecklistToggleButton({ label, icon, selected, variant, onPress }) {
  const isPass = variant === 'pass';
  const inactiveStyle = isPass ? styles.passInactive : styles.failInactive;
  const activeStyle = isPass ? styles.passActive : styles.failActive;
  const inactiveContentColor = isPass ? colors.primary[700] : colors.danger[700];

  return (
    <TouchableOpacity
      style={[
        styles.toggleButton,
        selected ? activeStyle : inactiveStyle,
      ]}
      onPress={onPress}
      activeOpacity={0.85}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={label}
    >
      {selected ? (
        <Icon name={icon} size={20} color={colors.white} />
      ) : null}
      <Text
        style={[
          styles.toggleText,
          selected ? styles.toggleTextActive : { color: inactiveContentColor },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export default function ChecklistItem({
  item,
  passed,
  remarks,
  onPassChange,
  onRemarksChange,
  isLast = false,
}) {
  return (
    <View style={[styles.container, isLast && styles.containerLast]}>
      <Text style={styles.label}>{item.question ?? item.label}</Text>
      {item.description ? (
        <Text style={styles.description}>{item.description}</Text>
      ) : null}

      <View style={styles.toggleRow}>
        <ChecklistToggleButton
          label="Pass"
          icon="checkmark-circle"
          selected={passed === true}
          variant="pass"
          onPress={() => onPassChange(true)}
        />
        <ChecklistToggleButton
          label="Fail"
          icon="close-circle"
          selected={passed === false}
          variant="fail"
          onPress={() => onPassChange(false)}
        />
      </View>

      {passed === false ? (
        <Input
          label="Remarks"
          value={remarks}
          onChangeText={onRemarksChange}
          placeholder="Describe the issue (optional)"
          style={styles.remarksInput}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.slate[300],
  },
  containerLast: {
    marginBottom: 0,
  },
  label: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.slate[900],
    fontWeight: '600',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.slate[600],
    marginBottom: spacing.md,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  toggleButton: {
    flex: 1,
    minHeight: 52,
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    elevation: 2,
    shadowColor: colors.slate[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  passInactive: {
    backgroundColor: colors.primary[50],
    borderColor: colors.primary[200],
  },
  passActive: {
    backgroundColor: colors.primary[600],
    borderColor: colors.primary[600],
  },
  failInactive: {
    backgroundColor: colors.danger[100],
    borderColor: '#fecaca',
  },
  failActive: {
    backgroundColor: colors.danger[500],
    borderColor: colors.danger[500],
  },
  toggleText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
  },
  toggleTextActive: {
    color: colors.white,
  },
  remarksInput: {
    marginBottom: 3,
  },
});
