import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography, surfaces, shadows } from '../../theme';

const SECTION_RADIUS = 12;

function SectionHeading({ title, subtitle }) {
  return (
    <View style={styles.titleRow}>
      <View style={styles.accent} />
      <View style={styles.textBlock}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

export default function Section({
  title,
  subtitle,
  style,
  contentStyle,
  children,
  contentFlush = false,
  contentFlushHorizontal = false,
}) {
  if (children) {
    return (
      <View style={[styles.section, style]}>
        <View style={styles.header}>
          <SectionHeading title={title} subtitle={subtitle} />
        </View>
        <View
          style={[
            styles.body,
            contentFlush && styles.bodyFlush,
            contentFlushHorizontal && !contentFlush && styles.bodyFlushHorizontal,
            contentStyle,
          ]}
        >
          {children}
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.standalone, style]}>
      <SectionHeading title={title} subtitle={subtitle} />
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: spacing.xl,
    marginBottom: spacing.lg,
    backgroundColor: surfaces.card,
    borderRadius: SECTION_RADIUS,
    overflow: 'hidden',
    ...shadows.xs,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.primary[50],
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.primary[200],
  },
  body: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    backgroundColor: surfaces.card,
  },
  bodyFlush: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  bodyFlushHorizontal: {
    paddingHorizontal: 0,
  },
  standalone: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.primary[50],
    borderRadius: SECTION_RADIUS,
    ...shadows.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'stretch',
    gap: spacing.md,
  },
  accent: {
    width: 4,
    borderRadius: 4,
    backgroundColor: colors.primary[600],
    marginVertical: 2,
  },
  textBlock: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    fontSize: 19,
    lineHeight: 26,
    fontWeight: '700',
    color: colors.slate[900],
  },
  subtitle: {
    ...typography.body,
    fontSize: 15,
    lineHeight: 22,
    color: colors.slate[600],
    marginTop: spacing.xs,
  },
});
