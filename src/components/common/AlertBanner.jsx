import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, typography } from '../../theme';

export default function AlertBanner({ message, type = 'error' }) {
  if (!message) {
    return null;
  }

  const isError = type === 'error';

  return (
    <View
      style={[
        styles.banner,
        isError ? styles.errorBanner : styles.successBanner,
      ]}
    >
      <Icon
        name={isError ? 'alert-circle' : 'checkmark-circle'}
        size={18}
        color={isError ? colors.danger[500] : colors.success[700]}
      />
      <Text
        style={[styles.text, isError ? styles.errorText : styles.successText]}
      >
        {message}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  errorBanner: {
    backgroundColor: colors.danger[100],
    borderColor: colors.danger[500],
  },
  successBanner: {
    backgroundColor: colors.success[100],
    borderColor: colors.primary[400],
  },
  text: {
    ...typography.bodySmall,
    flex: 1,
  },
  errorText: {
    color: colors.danger[700],
  },
  successText: {
    color: colors.success[700],
  },
});
