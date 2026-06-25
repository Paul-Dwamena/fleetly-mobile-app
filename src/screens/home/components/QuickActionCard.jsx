import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, shadows, borders, surfaces } from '../../../theme';

export default function QuickActionCard({
  title,
  description,
  icon,
  iconColor = colors.primary[700],
  iconBackground = colors.primary[50],
  iconBorderColor = colors.primary[100],
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
        <View
          style={[
            styles.iconWrap,
            { backgroundColor: iconBackground, borderColor: iconBorderColor },
          ]}
        >
          <Icon name={icon} size={22} color={iconColor} />
        </View>

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
    borderRadius: 16,
    ...borders.light,
    ...shadows.md,
    overflow: 'hidden',
    minHeight: 168,
  },
  bgIconWrap: {
    position: 'absolute',
    top: -12,
    right: -20,
    opacity: 0.1,
  },
  bgIcon: {
    transform: [{ rotate: '-12deg' }],
  },
  content: {
    flex: 1,
    padding: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    marginBottom: spacing.sm,
    alignSelf: 'center',
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '700',
    color: colors.slate[900],
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  description: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.slate[600],
    textAlign: 'center',
  },
});
