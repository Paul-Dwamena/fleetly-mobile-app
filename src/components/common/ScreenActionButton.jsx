import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, shadows } from '../../theme';

const variants = {
  primary: {
    backgroundColor: colors.primary[600],
    borderColor: colors.primary[600],
    textColor: colors.white,
  },
  danger: {
    backgroundColor: colors.danger[500],
    borderColor: colors.danger[500],
    textColor: colors.white,
  },
};

export default function ScreenActionButton({
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
      activeOpacity={0.85}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        {
          backgroundColor: variantStyle.backgroundColor,
          borderColor: variantStyle.borderColor,
        },
        isDisabled && styles.disabled,
        style,
      ]}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {loading ? (
        <ActivityIndicator color={variantStyle.textColor} />
      ) : (
        <>
          <Text style={[styles.text, { color: variantStyle.textColor }]}>
            {title}
          </Text>
          <View style={styles.arrow}>
            <Icon name="arrow-forward" size={18} color={variantStyle.textColor} />
          </View>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    paddingRight: spacing.xl,
  },
  arrow: {
    position: 'absolute',
    right: spacing.md,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    opacity: 0.5,
  },
});
