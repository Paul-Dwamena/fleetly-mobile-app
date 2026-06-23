import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, shadows } from '../../theme';

export default function FleetlyLogo({ showTagline = false }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Icon name="car-sport" size={36} color={colors.white} />
      </View>
      <Text style={styles.title}>Fleetly</Text>
      {showTagline ? (
        <Text style={styles.tagline}>Moving Efficiency Forward</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: spacing.xxxl,
  },
  iconBox: {
    width: 72,
    height: 72,
    borderRadius: 16,
    backgroundColor: colors.primary[500],
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
    ...shadows.sm,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.primary[600],
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 14,
    color: colors.slate[500],
    marginTop: spacing.xs,
    fontWeight: '500',
    textAlign: 'center',
  },
});
