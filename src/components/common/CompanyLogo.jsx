import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { colors, spacing, typography, borders, shadows } from '../../theme';
import { getInitials } from '../../utils/format/initials';

export default function CompanyLogo({
  companyName,
  logoUrl,
  size = 56,
  variant = 'default',
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = Boolean(logoUrl) && !imageFailed;
  const initials = getInitials(companyName);
  const fontSize = size * 0.32;
  const isHero = variant === 'hero';
  const borderRadius = size * (isHero ? 0.28 : 0.22);

  return (
    <View
      style={[
        styles.container,
        isHero ? styles.containerHero : styles.containerDefault,
        { width: size, height: size, borderRadius },
      ]}
    >
      {showImage ? (
        <Image
          source={{ uri: logoUrl }}
          style={styles.image}
          resizeMode="contain"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <Text
          style={[
            styles.initials,
            isHero ? styles.initialsHero : styles.initialsDefault,
            { fontSize },
          ]}
        >
          {initials}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  containerDefault: {
    backgroundColor: colors.primary[50],
    ...borders.light,
  },
  containerHero: {
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.35)',
    ...shadows.md,
  },
  image: {
    width: '100%',
    height: '100%',
    padding: spacing.sm,
    backgroundColor: colors.white,
  },
  initials: {
    ...typography.label,
    fontWeight: '800',
  },
  initialsDefault: {
    color: colors.primary[800],
  },
  initialsHero: {
    color: colors.primary[700],
  },
});
