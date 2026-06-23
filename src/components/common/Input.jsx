import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, shadows, typography, surfaces } from '../../theme';

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  showPasswordToggle = false,
  error,
  keyboardType = 'default',
  autoCapitalize = 'none',
  multiline = false,
  numberOfLines = 1,
  style,
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const isSecure = secureTextEntry && !isPasswordVisible;

  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.slate[400]}
          secureTextEntry={isSecure}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical={multiline ? 'top' : 'center'}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            styles.input,
            multiline && styles.inputMultiline,
            isFocused && !error && styles.inputFocused,
            error && styles.inputError,
            showPasswordToggle && styles.inputWithToggle,
          ]}
        />
        {showPasswordToggle ? (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible((prev) => !prev)}
            style={styles.toggleButton}
            accessibilityLabel={isPasswordVisible ? 'Hide password' : 'Show password'}
          >
            <Icon
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={colors.slate[400]}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.label,
    color: colors.slate[800],
    marginBottom: spacing.sm,
    fontWeight: '700',
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    minHeight: 48,
    borderWidth: 1.5,
    borderColor: colors.slate[300],
    borderRadius: 12,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontSize: 16,
    color: colors.slate[900],
    backgroundColor: surfaces.card,
    ...shadows.sm,
  },
  inputFocused: {
    borderColor: colors.primary[500],
    borderWidth: 2,
    backgroundColor: colors.primary[50],
    shadowColor: colors.primary[600],
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2,
  },
  inputMultiline: {
    minHeight: 120,
    paddingTop: spacing.md,
  },
  inputWithToggle: {
    paddingRight: 48,
  },
  inputError: {
    borderColor: colors.danger[500],
    borderWidth: 2,
    backgroundColor: colors.danger[100],
  },
  toggleButton: {
    position: 'absolute',
    right: spacing.md,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    paddingHorizontal: spacing.xs,
  },
  error: {
    ...typography.caption,
    color: colors.danger[600],
    marginTop: spacing.xs,
  },
});
