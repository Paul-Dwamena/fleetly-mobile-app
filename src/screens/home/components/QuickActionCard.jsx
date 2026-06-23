import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, shadows, borders, surfaces } from '../../../theme';

export default function QuickActionCard({
  title,
  description,
  buttonTitle,
  icon,
  iconColor = colors.primary[700],
  iconBackground = colors.primary[50],
  iconBorderColor = colors.primary[100],
  accentColor = colors.primary[600],
  onPress,
  style,
}) {
  return (
    <View style={[styles.card, style]}>
      <View style={styles.bgIconWrap} pointerEvents="none">
        <Icon name={icon} size={120} color={accentColor} style={styles.bgIcon} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View
            style={[
              styles.iconWrap,
              { backgroundColor: iconBackground, borderColor: iconBorderColor },
            ]}
          >
            <Icon name={icon} size={26} color={iconColor} />
          </View>
          <Text style={styles.title}>{title}</Text>
        </View>

        <Text style={styles.description}>{description}</Text>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={onPress}
          style={styles.button}
          accessibilityRole="button"
          accessibilityLabel={buttonTitle}
        >
          <Text style={styles.buttonText}>{buttonTitle}</Text>
          <View style={styles.buttonArrow}>
            <Icon name="arrow-forward" size={18} color={colors.white} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: surfaces.card,
    borderRadius: 16,
    ...borders.light,
    ...shadows.md,
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  bgIconWrap: {
    position: 'absolute',
    top: -18,
    right: -28,
    opacity: 0.1,
  },
  bgIcon: {
    transform: [{ rotate: '-12deg' }],
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  title: {
    flex: 1,
    fontSize: 19,
    lineHeight: 26,
    fontWeight: '700',
    color: colors.slate[900],
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.slate[600],
    marginBottom: spacing.lg,
  },
  button: {
    minHeight: 50,
    borderRadius: 12,
    backgroundColor: colors.primary[600],
    borderWidth: 1,
    borderColor: colors.primary[600],
    paddingHorizontal: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
    flex: 1,
    paddingRight: spacing.xl,
  },
  buttonArrow: {
    position: 'absolute',
    right: spacing.md,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
