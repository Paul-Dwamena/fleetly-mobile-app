import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../theme';

export const listItemStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.slate[400],
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  content: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  title: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
    color: colors.slate[900],
    marginBottom: 2,
  },
  meta: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.slate[500],
    marginBottom: spacing.xs,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  labelFlex: {
    flex: 1,
  },
  remarks: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.slate[600],
    marginTop: spacing.xs,
  },
});
