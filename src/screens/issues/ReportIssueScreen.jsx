import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import {
  AlertBanner,
  ConfirmModal,
  Input,
  LoadingSpinner,
  Screen,
  ScreenActionButton,
  Section,
  useConfirmModal,
} from '../../components/common';
import PrioritySelector from './components/PrioritySelector';
import ReportIssueIntroCard from './components/ReportIssueIntroCard';
import { createIssue } from '../../services/issueService';
import { getDriverOverview } from '../../services/driverService';
import { getApiError } from '../../utils/api/error';
import { spacing } from '../../theme';

function getReporterName(user) {
  const name = [user?.firstName, user?.lastName].filter(Boolean).join(' ');

  if (name) {
    return name;
  }

  return user?.email?.split('@')[0] ?? 'Driver';
}

export default function ReportIssueScreen({ navigation }) {
  const authUser = useSelector((state) => state.auth.user);
  const { confirm, confirmModalProps } = useConfirmModal();
  const [vehicleId, setVehicleId] = useState(null);
  const [vehicleName, setVehicleName] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
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

  useEffect(() => {
    const loadVehicle = async () => {
      try {
        setError('');
        setLoading(true);
        const overview = await getDriverOverview();
        setVehicleId(overview?.currentAsset?.vehicleId ?? null);
        setVehicleName(overview?.currentAsset?.vehicleName ?? '');
      } catch (err) {
        showError(getApiError(err));
      } finally {
        setLoading(false);
      }
    };

    loadVehicle();
  }, []);

  const submitIssue = async () => {
    setError('');
    setSubmitting(true);

    try {
      const result = await createIssue({
        vehicleId,
        reportedById: authUser?.id,
        reportedByType: 'DRIVER',
        reporterName: getReporterName(authUser),
        description: description.trim(),
        priority,
      });

      Alert.alert(
        'Issue reported',
        'Your fleet manager has been notified.',
        [
          {
            text: 'View details',
            onPress: () =>
              navigation.replace('IssueDetail', { issueId: result.id }),
          },
        ],
      );
    } catch (err) {
      showError(getApiError(err));
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitPress = () => {
    if (!vehicleId) {
      showError('No vehicle is assigned to you. Contact your fleet manager.');
      return;
    }

    if (!authUser?.id) {
      showError('Unable to identify your driver account. Please sign in again.');
      return;
    }

    if (!description.trim()) {
      showError('Please describe the issue.');
      return;
    }

    confirm({
      title: 'Submit issue?',
      message:
        'Your fleet manager will be notified about this vehicle problem.',
      confirmLabel: 'Submit',
      onConfirm: submitIssue,
    });
  };

  if (loading) {
    return (
      <Screen>
        <LoadingSpinner fullScreen />
      </Screen>
    );
  }

  return (
    <Screen scroll scrollRef={scrollRef}>
      <ReportIssueIntroCard vehicleName={vehicleName} />

      <Section
        title="Issue details"
        subtitle="What happened and how urgent is it?"
        style={styles.section}
      >
        <Input
          label="Description"
          value={description}
          onChangeText={(text) => {
            clearError();
            setDescription(text);
          }}
          placeholder="What is wrong with the vehicle?"
          multiline
          numberOfLines={4}
          autoCapitalize="sentences"
        />

        <PrioritySelector
          value={priority}
          onChange={(value) => {
            clearError();
            setPriority(value);
          }}
        />
      </Section>

      <AlertBanner message={error} />

      <ScreenActionButton
        title="Submit issue"
        variant="danger"
        onPress={handleSubmitPress}
        loading={submitting}
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
