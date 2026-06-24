import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
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
import VehicleRequestIntroCard from './components/VehicleRequestIntroCard';
import VehicleSelector from './components/VehicleSelector';
import {
  getUnassignedVehicles,
  submitVehicleRequest,
} from '../../services/vehicleRequestService';
import { getApiError } from '../../utils/api/error';
import { spacing } from '../../theme';

export default function SubmitVehicleRequestScreen({ navigation }) {
  const { confirm, confirmModalProps } = useConfirmModal();
  const [vehicles, setVehicles] = useState([]);
  const [vehicleId, setVehicleId] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
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
    const loadVehicles = async () => {
      try {
        setError('');
        setLoading(true);
        const data = await getUnassignedVehicles();
        const list = Array.isArray(data) ? data : data?.content ?? [];
        setVehicles(list);

        if (list.length > 0) {
          setVehicleId(list[0].id);
        }
      } catch (err) {
        showError(getApiError(err));
      } finally {
        setLoading(false);
      }
    };

    loadVehicles();
  }, []);

  const submitRequest = async () => {
    setError('');
    setSubmitting(true);

    try {
      await submitVehicleRequest({
        vehicleId,
        reason: reason.trim(),
      });

      Alert.alert(
        'Request submitted',
        'Your fleet manager will review your vehicle request.',
        [{ text: 'OK', onPress: () => navigation.navigate('VehicleRequestList') }],
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
      showError('Please select a vehicle.');
      return;
    }

    if (!reason.trim()) {
      showError('Please explain why you need this vehicle.');
      return;
    }

    confirm({
      title: 'Submit request?',
      message:
        'Your fleet manager will review this replacement vehicle request.',
      confirmLabel: 'Submit',
      onConfirm: submitRequest,
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
      <VehicleRequestIntroCard availableCount={vehicles.length} />

      <Section
        title="Request details"
        subtitle="Select a vehicle and explain your need"
        style={styles.section}
      >
        <VehicleSelector
          vehicles={vehicles}
          value={vehicleId}
          onChange={(id) => {
            clearError();
            setVehicleId(id);
          }}
        />

        <Input
          label="Reason"
          value={reason}
          onChangeText={(text) => {
            clearError();
            setReason(text);
          }}
          placeholder="Why do you need this replacement vehicle?"
          multiline
          numberOfLines={4}
          autoCapitalize="sentences"
        />
      </Section>

      <AlertBanner message={error} />

      <ScreenActionButton
        title="Submit request"
        onPress={handleSubmitPress}
        loading={submitting}
        disabled={vehicles.length === 0}
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
