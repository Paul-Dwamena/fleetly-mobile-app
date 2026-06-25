import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, spacing, shadows } from '../../theme';

const fleetlyLogo = require('../../../android/app/src/main/res/playstore-icon.png');

export default function FleetlyLogo({ showTagline = false }) {
  return (
    <View style={styles.container}>
      <Image source={fleetlyLogo} style={styles.logo} resizeMode="cover" />
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
  logo: {
    width: 72,
    height: 72,
    borderRadius: 16,
    marginBottom: spacing.lg,
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
