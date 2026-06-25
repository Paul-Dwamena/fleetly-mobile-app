import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing } from '../../../theme';

export default function ProfileMenuRow({ icon, label, onPress, isLast = false }) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.row, isLast && styles.rowLast]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={styles.iconWrap}>
        <Icon name={icon} size={20} color={colors.primary[700]} />
      </View>
      <Text style={styles.label}>{label}</Text>
      <Icon name="chevron-forward" size={20} color={colors.slate[400]} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.slate[200],
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: colors.primary[50],
    borderWidth: 1,
    borderColor: colors.primary[200],
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    color: colors.slate[900],
  },
});
