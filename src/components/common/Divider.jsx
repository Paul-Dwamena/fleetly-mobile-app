import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing, surfaces } from '../../theme';

export default function Divider({ style }) {
  return <View style={[styles.divider, style]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: surfaces.divider,
    marginVertical: spacing.md,
  },
});
