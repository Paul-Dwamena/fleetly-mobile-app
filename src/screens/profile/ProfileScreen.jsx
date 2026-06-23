import React, { useCallback, useState } from 'react';
import {
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import {
  AlertBanner,
  Button,
  ConfirmModal,
  LoadingSpinner,
  Screen,
  ScreenActionButton,
  ScreenHeader,
  Section,
  useConfirmModal,
} from '../../components/common';
import ProfileDetailRow from './components/ProfileDetailRow';
import ProfileMenuRow from './components/ProfileMenuRow';
import ProfileSummaryCard from './components/ProfileSummaryCard';
import { clearAuth } from '../../services/authService';
import { getDriverProfile } from '../../services/driverService';
import { logout } from '../../store/slices/authSlice';
import { getApiError } from '../../utils/api/error';
import { formatDate } from '../../utils/format/date';
import { colors, spacing } from '../../theme';

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const { confirm, confirmModalProps } = useConfirmModal();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadProfile = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError('');
      const data = await getDriverProfile();
      setProfile(data);
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadProfile();
    }, []),
  );

  const handleLogout = async () => {
    try {
      await clearAuth();
      dispatch(logout());
    } catch (err) {
      setError(getApiError(err));
      throw err;
    }
  };

  const handleLogoutPress = () => {
    confirm({
      title: 'Sign out?',
      message: 'You will need to sign in again to use the app.',
      confirmLabel: 'Sign out',
      variant: 'danger',
      onConfirm: handleLogout,
    });
  };

  if (loading && !profile) {
    return (
      <Screen>
        <LoadingSpinner fullScreen />
      </Screen>
    );
  }

  return (
    <Screen
      scroll
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => loadProfile(true)}
          colors={[colors.primary[600]]}
          tintColor={colors.primary[600]}
        />
      }
    >
      <ScreenHeader
        title="Profile"
        subtitle="Your account and work details"
      />

      <AlertBanner message={error} />

      {error ? (
        <Button
          title="Try again"
          variant="secondary"
          onPress={() => loadProfile()}
          style={styles.retryButton}
        />
      ) : null}

      <ProfileSummaryCard profile={profile} />

      <Section
        title="Personal details"
        subtitle="Contact and license information"
        style={styles.section}
      >
        <ProfileDetailRow
          icon="call-outline"
          label="Phone"
          value={profile?.contactNumber}
        />
        <ProfileDetailRow
          icon="calendar-outline"
          label="Date of birth"
          value={formatDate(profile?.dateOfBirth)}
        />
        <ProfileDetailRow
          icon="card-outline"
          label="License number"
          value={profile?.licenseNumber}
        />
        <ProfileDetailRow
          icon="time-outline"
          label="License expiry"
          value={formatDate(profile?.licenseExpiry)}
          isLast
        />
      </Section>

      <Section
        title="Work details"
        subtitle="Your fleet assignment"
        style={styles.section}
      >
        <ProfileDetailRow
          icon="business-outline"
          label="Company"
          value={profile?.company?.name}
        />
        <ProfileDetailRow
          icon="location-outline"
          label="Branch"
          value={profile?.branch}
          isLast
        />
      </Section>

      <Section
        title="Security"
        subtitle="Manage your account access"
        style={styles.section}
      >
        <ProfileMenuRow
          icon="lock-closed-outline"
          label="Change password"
          onPress={() => navigation.navigate('ChangePassword')}
          isLast
        />
      </Section>

      <ScreenActionButton
        title="Sign out"
        variant="danger"
        onPress={handleLogoutPress}
      />

      <ConfirmModal {...confirmModalProps} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  retryButton: {
    marginBottom: spacing.lg,
  },
  section: {
    marginTop: 0,
  },
});
