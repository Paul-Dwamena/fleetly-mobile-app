import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Input } from '../../../components/common';
import { colors, spacing } from '../../../theme';

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
      <Text style={styles.label}>{item.label}</Text>
      {item.description ? (
        <Text style={styles.description}>{item.description}</Text>
      ) : null}

      <View style={styles.toggleRow}>
        <TouchableOpacity
          style={[styles.toggleButton, passed === true && styles.passActive]}
          onPress={() => onPassChange(true)}
          activeOpacity={0.85}
        >
          <Text
            style={[styles.toggleText, passed === true && styles.toggleTextActive]}
          >
            Pass
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.toggleButton, passed === false && styles.failActive]}
          onPress={() => onPassChange(false)}
          activeOpacity={0.85}
        >
          <Text
            style={[styles.toggleText, passed === false && styles.toggleTextActive]}
          >
            Fail
          </Text>
        </TouchableOpacity>
      </View>

      {passed === false ? (
        <Input
          label="Remarks"
          value={remarks}
          onChangeText={onRemarksChange}
          placeholder="Describe the issue"
          style={styles.remarksInput}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.slate[400],
  },
  containerLast: {
    borderBottomWidth: 0,
  },
  label: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.slate[900],
    fontWeight: '600',
    marginBottom: 2,
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
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.slate[300],
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passActive: {
    backgroundColor: colors.primary[600],
    borderColor: colors.primary[600],
  },
  failActive: {
    backgroundColor: colors.danger[500],
    borderColor: colors.danger[500],
  },
  toggleText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: colors.slate[700],
  },
  toggleTextActive: {
    color: colors.white,
  },
  remarksInput: {
    marginBottom: 0,
  },
});
