import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing } from '../../../theme';

function getCellBorders(index) {
  const isLeftColumn = index % 2 === 0;
  const isTopRow = index < 2;

  return {
    borderRightWidth: isLeftColumn ? StyleSheet.hairlineWidth : 0,
    borderBottomWidth: isTopRow ? StyleSheet.hairlineWidth : 0,
    borderColor: colors.slate[200],
  };
}

export default function StatCard({
  title,
  value,
  icon,
  iconColor = colors.primary[600],
  variant = 'cell',
  index = 0,
}) {
  const isCell = variant === 'cell';

  return (
    <View style={[isCell ? styles.cell : styles.card, isCell && getCellBorders(index)]}>
      <View style={styles.cardContent}>
        <Icon name={icon} size={22} color={iconColor} />
        <Text style={styles.value} accessibilityRole="text">
          {value}
        </Text>
      </View>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cell: {
    width: '50%',
    alignItems: 'flex-start',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  card: {
    flex: 1,
    alignItems: 'flex-start',
    minWidth: '45%',
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  value: {
    fontSize: 24,
    lineHeight: 34,
    fontWeight: '800',
    color: colors.slate[900],
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '600',
    color: colors.slate[600],
    textAlign: 'left',
  },
});
