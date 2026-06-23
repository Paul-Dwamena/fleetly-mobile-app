import React, { useRef, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import {
  AlertBanner,
  ConfirmModal,
  Input,
  Screen,
  ScreenActionButton,
  Section,
  useConfirmModal,
} from '../../components/common';
import ChangePasswordIntroCard from './components/ChangePasswordIntroCard';
import { changePassword } from '../../services/authService';
import { getApiError } from '../../utils/api/error';
import { isValidPassword } from '../../utils/validation';
import { spacing } from '../../theme';

export default function ChangePasswordScreen({ navigation }) {
  const { confirm, confirmModalProps } = useConfirmModal();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  const showError = (message) => {
    setError(message);
    requestAnimationFrame(() => {
      scrollRef.current?.scrollToEnd({ animated: true });
    });
  };

  const clearError = () => {
    if (error) {
      setError('');
    }
  };

  const updatePassword = async () => {
    setError('');
    setLoading(true);

    try {
      await changePassword(oldPassword, newPassword);

      Alert.alert(
        'Password updated',
        'Your password has been changed successfully.',
        [{ text: 'OK', onPress: () => navigation.goBack() }],
      );
    } catch (err) {
      showError(getApiError(err));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPress = () => {
    if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      showError('Please fill in all fields.');
      return;
    }

    if (!isValidPassword(newPassword)) {
      showError('New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      showError('New passwords do not match.');
      return;
    }

    if (oldPassword === newPassword) {
      showError('New password must be different from your current password.');
      return;
    }

    confirm({
      title: 'Update password?',
      message: 'You will use your new password the next time you sign in.',
      confirmLabel: 'Update',
      onConfirm: updatePassword,
    });
  };

  return (
    <Screen scroll scrollRef={scrollRef}>
      <ChangePasswordIntroCard />

      <Section
        title="New password"
        subtitle="Enter your current password and choose a new one"
        style={styles.section}
      >
        <Input
          label="Current password"
          value={oldPassword}
          onChangeText={(text) => {
            clearError();
            setOldPassword(text);
          }}
          placeholder="Enter current password"
          secureTextEntry
          showPasswordToggle
        />

        <Input
          label="New password"
          value={newPassword}
          onChangeText={(text) => {
            clearError();
            setNewPassword(text);
          }}
          placeholder="At least 6 characters"
          secureTextEntry
          showPasswordToggle
        />

        <Input
          label="Confirm new password"
          value={confirmPassword}
          onChangeText={(text) => {
            clearError();
            setConfirmPassword(text);
          }}
          placeholder="Re-enter new password"
          secureTextEntry
          showPasswordToggle
        />
      </Section>

      <AlertBanner message={error} />

      <ScreenActionButton
        title="Update password"
        onPress={handleSubmitPress}
        loading={loading}
      />

      <ConfirmModal {...confirmModalProps} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 0,
  },
});
