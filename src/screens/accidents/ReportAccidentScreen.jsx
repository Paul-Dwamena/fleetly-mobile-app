import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import {
  AlertBanner,
  ConfirmModal,
  DateTimePickerField,
  Input,
  LoadingSpinner,
  Screen,
  ScreenActionButton,
  Section,
  useConfirmModal,
} from '../../components/common';
import ReportAccidentIntroCard from './components/ReportAccidentIntroCard';
import SeveritySelector from './components/SeveritySelector';
import { reportAccident } from '../../services/accidentService';
import { getDriverOverview } from '../../services/driverService';
import { getApiError } from '../../utils/api/error';
import { dateToIsoDateTime, getNowDate } from '../../utils/format/dateTime';
import { spacing } from '../../theme';

export default function ReportAccidentScreen({ navigation }) {
  const { confirm, confirmModalProps } = useConfirmModal();
  const [vehicleId, setVehicleId] = useState(null);
  const [vehicleName, setVehicleName] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [incidentDate, setIncidentDate] = useState(getNowDate());
  const [severity, setSeverity] = useState('MAJOR');
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

  const submitReport = async () => {
    setError('');
    setSubmitting(true);

    try {
      const result = await reportAccident({
        vehicleId,
        incidentDate: dateToIsoDateTime(incidentDate),
        location: location.trim(),
        description: description.trim(),
        severity,
      });

      Alert.alert(
        'Accident reported',
        'Your fleet manager has been notified.',
        [
          {
            text: 'View details',
            onPress: () =>
              navigation.replace('AccidentDetail', { accidentId: result.id }),
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

    if (!location.trim()) {
      showError('Please enter the incident location.');
      return;
    }

    if (!description.trim()) {
      showError('Please describe what happened.');
      return;
    }

    if (!dateToIsoDateTime(incidentDate)) {
      showError('Please select the incident date and time.');
      return;
    }

    confirm({
      title: 'Submit accident report?',
      message:
        'Your fleet manager will be notified about this incident immediately.',
      confirmLabel: 'Submit',
      onConfirm: submitReport,
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
      <ReportAccidentIntroCard vehicleName={vehicleName} />

      <Section
        title="Incident details"
        subtitle="When and where did the accident happen?"
        style={styles.section}
      >
        <DateTimePickerField
          label="Incident date & time"
          value={incidentDate}
          onChange={(date) => {
            clearError();
            setIncidentDate(date);
          }}
          maximumDate={new Date()}
        />

        <Input
          label="Location"
          value={location}
          onChangeText={(text) => {
            clearError();
            setLocation(text);
          }}
          placeholder="Where did the accident happen?"
          autoCapitalize="words"
        />

        <Input
          label="Description"
          value={description}
          onChangeText={(text) => {
            clearError();
            setDescription(text);
          }}
          placeholder="Describe what happened"
          multiline
          numberOfLines={4}
          autoCapitalize="sentences"
        />

        <SeveritySelector
          value={severity}
          onChange={(value) => {
            clearError();
            setSeverity(value);
          }}
        />
      </Section>

      <AlertBanner message={error} />

      <ScreenActionButton
        title="Submit report"
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
