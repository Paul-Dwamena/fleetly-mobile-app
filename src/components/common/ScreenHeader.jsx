import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme';

export default function ScreenHeader({ title, subtitle, style }) {
  return (
    <View style={[styles.header, style]}>
      <View style={styles.glowPrimary} />
      <View style={styles.glowSecondary} />

      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginHorizontal: -spacing.xl,
    marginTop: -spacing.xl,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
    backgroundColor: colors.primary[600],
    borderBottomLeftRadius: 22,
    borderBottomRightRadius: 22,
    overflow: 'hidden',
  },
  glowPrimary: {
    position: 'absolute',
    top: -40,
    right: -28,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  glowSecondary: {
    position: 'absolute',
    bottom: -24,
    left: -16,
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  title: {
    fontSize: 26,
    lineHeight: 32,
    fontWeight: '800',
    color: colors.white,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(255,255,255,0.88)',
    marginTop: spacing.sm,
    fontWeight: '500',
  },
});
