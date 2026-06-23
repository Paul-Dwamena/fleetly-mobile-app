import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, typography } from '../../theme';

export default function EmptyState({
  icon = 'document-text-outline',
  title = 'Nothing here yet',
  message,
}) {
  return (
    <View style={styles.container}>
      <Icon name={icon} size={48} color={colors.slate[300]} />
      <Text style={styles.title}>{title}</Text>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
  },
  title: {
    ...typography.h3,
    color: colors.slate[700],
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  message: {
    ...typography.bodySmall,
    color: colors.slate[500],
    marginTop: spacing.sm,
    textAlign: 'center',
  },
});
