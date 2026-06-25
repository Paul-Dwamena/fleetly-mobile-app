import { Platform } from 'react-native';
import { colors } from './colors';

const createShadow = (elevation, opacity, radius, offsetY) =>
  Platform.select({
    ios: {
      shadowColor: colors.slate[900],
      shadowOffset: { width: 0, height: offsetY },
      shadowOpacity: opacity,
      shadowRadius: radius,
    },
    android: {
      elevation,
    },
    default: {},
  });

export const shadows = {
  sm: createShadow(3, 0.08, 6, 2),
  md: createShadow(5, 0.12, 10, 3),
  lg: createShadow(8, 0.14, 14, 4),
};

export const borders = {
  light: {
    borderWidth: 1,
    borderColor: colors.slate[300],
  },
  medium: {
    borderWidth: 1,
    borderColor: colors.slate[300],
  },
  strong: {
    borderWidth: 1.5,
    borderColor: colors.slate[400],
  },
};
