import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing, surfaces } from '../../theme';

export default function ListSection({ children, style, embedded = false }) {
  return (
    <View style={[styles.section, embedded && styles.embedded, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginHorizontal: -spacing.xl,
    backgroundColor: surfaces.card,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: colors.slate[200],
    marginBottom: spacing.lg,
  },
  embedded: {
    marginHorizontal: 0,
    marginBottom: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    backgroundColor: 'transparent',
  },
});
