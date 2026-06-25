import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing, shadows, borders, surfaces } from '../../theme';

export default function Card({ children, style, elevated = true, comfortable = false }) {
  return (
    <View
      style={[
        styles.card,
        comfortable && styles.comfortable,
        elevated && shadows.xs,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: surfaces.card,
    borderRadius: 12,
    ...borders.light,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  comfortable: {
    padding: spacing.xl,
    borderRadius: 18,
  },
});
