import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { spacing, surfaces } from '../../theme';

export default function Screen({
  children,
  scroll = false,
  style,
  contentStyle,
  refreshControl,
  scrollRef,
}) {
  const content = scroll ? (
    <ScrollView
      ref={scrollRef}
      contentContainerStyle={[styles.scrollContent, contentStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      refreshControl={refreshControl}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, contentStyle]}>{children}</View>
  );

  return (
    <SafeAreaView style={[styles.screen, style]} edges={['top', 'left', 'right']}>
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: surfaces.canvas,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
  },
  scrollContent: {
    flexGrow: 1,
    padding: spacing.xl,
  },
});
