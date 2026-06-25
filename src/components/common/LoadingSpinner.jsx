import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors, surfaces } from '../../theme';

export default function LoadingSpinner({ fullScreen = false, size = 'large' }) {
  return (
    <View style={[styles.container, fullScreen && styles.fullScreen]}>
      <ActivityIndicator size={size} color={colors.primary[600]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullScreen: {
    flex: 1,
    backgroundColor: surfaces.canvas,
  },
});
