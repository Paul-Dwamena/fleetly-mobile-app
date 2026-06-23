import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { colors, spacing, typography, shadows } from '../../theme';

const variants = {
  primary: {
    backgroundColor: colors.primary[600],
    textColor: colors.white,
    borderColor: colors.primary[600],
  },
  secondary: {
    backgroundColor: colors.white,
    textColor: colors.slate[800],
    borderColor: colors.slate[300],
  },
  outline: {
    backgroundColor: colors.white,
    textColor: colors.slate[800],
    borderColor: colors.slate[300],
  },
  danger: {
    backgroundColor: colors.danger[500],
    textColor: colors.white,
    borderColor: colors.danger[500],
  },
};

export default function Button({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}) {
  const variantStyle = variants[variant] || variants.primary;
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={[
        styles.button,
        {
          backgroundColor: variantStyle.backgroundColor,
          borderColor: variantStyle.borderColor,
        },
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variantStyle.textColor} />
      ) : (
        <Text style={[styles.text, { color: variantStyle.textColor }]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  text: {
    ...typography.label,
    fontSize: 16,
  },
  disabled: {
    opacity: 0.5,
  },
});
