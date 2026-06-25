import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, shadows, surfaces, borders } from '../../../theme';

export default function QuickActionCard({
  title,
  description,
  icon,
  iconColor = colors.primary[700],
  accentColor = colors.primary[600],
  onPress,
  style,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      style={[styles.card, style]}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      <View style={styles.bgIconWrap} pointerEvents="none">
        <Icon name={icon} size={88} color={accentColor} style={styles.bgIcon} />
      </View>

      <View style={styles.content}>
        <Icon name={icon} size={26} color={iconColor} style={styles.icon} />

        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: surfaces.card,
    borderRadius: 12,
    ...borders.light,
    ...shadows.sm,
    overflow: 'hidden',
    minHeight: 168,
  },
  bgIconWrap: {
    position: 'absolute',
    top: -12,
    right: -20,
    opacity: 0.08,
  },
  bgIcon: {
    transform: [{ rotate: '-12deg' }],
  },
  content: {
    flex: 1,
    padding: spacing.md,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: colors.slate[900],
    marginBottom: spacing.xs,
    textAlign: 'left',
  },
  description: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.slate[600],
    textAlign: 'left',
  },
});
