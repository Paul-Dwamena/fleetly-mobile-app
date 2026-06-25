import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';
import Button from './Button';
import { colors, spacing, typography, shadows, surfaces } from '../../theme';

export default function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'primary',
  loading = false,
  onConfirm,
  onCancel,
}) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <Pressable style={styles.overlay} onPress={loading ? undefined : onCancel}>
        <Pressable style={styles.dialog} onPress={(event) => event.stopPropagation()}>
          <Text style={styles.title}>{title}</Text>
          {message ? <Text style={styles.message}>{message}</Text> : null}

          <View style={styles.actions}>
            <Button
              title={cancelLabel}
              variant="secondary"
              onPress={onCancel}
              disabled={loading}
              style={styles.actionButton}
            />
            <Button
              title={confirmLabel}
              variant={variant === 'danger' ? 'danger' : 'primary'}
              onPress={onConfirm}
              loading={loading}
              style={styles.actionButton}
            />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  dialog: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: surfaces.card,
    borderRadius: 14,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    ...shadows.lg,
  },
  title: {
    ...typography.h3,
    color: colors.slate[900],
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  message: {
    ...typography.body,
    color: colors.slate[600],
    lineHeight: 24,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
    marginTop: 0,
  },
});
