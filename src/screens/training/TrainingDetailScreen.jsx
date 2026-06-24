import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import {
  AlertBanner,
  Button,
  ConfirmModal,
  Input,
  LoadingSpinner,
  Screen,
  ScreenActionButton,
  Section,
  useConfirmModal,
} from '../../components/common';
import ProfileDetailRow from '../profile/components/ProfileDetailRow';
import TrainingSummaryCard from './components/TrainingSummaryCard';
import { completeTraining, getTraining } from '../../services/trainingService';
import { getApiError } from '../../utils/api/error';
import { formatDate } from '../../utils/format/date';
import { spacing } from '../../theme';
import {
  canSubmitCompletion,
  getTodayIsoDate,
  hasSubmittedDetails,
} from './utils/trainingStatus';

export default function TrainingDetailScreen({ route, navigation }) {
  const { trainingId } = route.params;
  const { confirm, confirmModalProps } = useConfirmModal();
  const [training, setTraining] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [completionDate, setCompletionDate] = useState(getTodayIsoDate());
  const [certificateUrl, setCertificateUrl] = useState('');
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
    const loadTraining = async () => {
      try {
        setError('');
        setLoading(true);
        const data = await getTraining(trainingId);
        setTraining(data);
        setCompletionDate(data.completionDate ?? getTodayIsoDate());
      } catch (err) {
        showError(getApiError(err));
      } finally {
        setLoading(false);
      }
    };

    loadTraining();
  }, [trainingId]);

  useEffect(() => {
    if (training?.trainingName) {
      navigation.setOptions({ title: training.trainingName });
    }
  }, [training?.trainingName, navigation]);

  const submitTraining = async () => {
    setError('');
    setSubmitting(true);

    try {
      const payload = {
        issueDate: issueDate.trim(),
        expiryDate: expiryDate.trim(),
        completionDate: completionDate.trim(),
        certificateUrl: certificateUrl.trim(),
      };

      await completeTraining(trainingId, payload);

      Alert.alert(
        'Training completed',
        'Your certificate details have been submitted successfully.',
        [{ text: 'OK', onPress: () => navigation.goBack() }],
      );
    } catch (err) {
      showError(getApiError(err));
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const handleSubmitPress = () => {
    if (
      !issueDate.trim() ||
      !expiryDate.trim() ||
      !completionDate.trim() ||
      !certificateUrl.trim()
    ) {
      showError('Please fill in all certificate details.');
      return;
    }

    confirm({
      title: 'Complete training?',
      message:
        'Your certificate details will be submitted to your fleet manager.',
      confirmLabel: 'Submit',
      onConfirm: submitTraining,
    });
  };

  if (loading) {
    return (
      <Screen>
        <LoadingSpinner fullScreen />
      </Screen>
    );
  }

  const showForm = training && canSubmitCompletion(training.status);
  const showCompletionDetails = training && hasSubmittedDetails(training);

  return (
    <Screen scroll scrollRef={scrollRef}>
      {error && !training ? (
        <>
          <AlertBanner message={error} />
          <Button
            title="Go back"
            variant="secondary"
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          />
        </>
      ) : null}

      {training ? (
        <>
          <TrainingSummaryCard training={training} />

          <Section
            title="Training details"
            subtitle="Course and schedule information"
            style={styles.section}
          >
            <ProfileDetailRow
              icon="person-outline"
              label="Instructor"
              value={training.instructor}
            />
            <ProfileDetailRow
              icon="location-outline"
              label="Location"
              value={training.location}
            />
            <ProfileDetailRow
              icon="calendar-outline"
              label="Scheduled"
              value={formatDate(training.scheduledDate)}
            />
            {showCompletionDetails ? (
              <ProfileDetailRow
                icon="checkmark-circle-outline"
                label="Completed"
                value={formatDate(training.completionDate)}
                isLast
              />
            ) : (
              <ProfileDetailRow
                icon="person-outline"
                label="Driver"
                value={training.driverName}
                isLast
              />
            )}
          </Section>

          {showForm ? (
            <>
              <Section
                title="Certificate details"
                subtitle="Enter your training certificate information"
                style={styles.section}
              >
                <Input
                  label="Issue date"
                  value={issueDate}
                  onChangeText={(text) => {
                    clearError();
                    setIssueDate(text);
                  }}
                  placeholder="YYYY-MM-DD"
                  autoCapitalize="none"
                />
                <Input
                  label="Expiry date"
                  value={expiryDate}
                  onChangeText={(text) => {
                    clearError();
                    setExpiryDate(text);
                  }}
                  placeholder="YYYY-MM-DD"
                  autoCapitalize="none"
                />
                <Input
                  label="Completion date"
                  value={completionDate}
                  onChangeText={(text) => {
                    clearError();
                    setCompletionDate(text);
                  }}
                  placeholder="YYYY-MM-DD"
                  autoCapitalize="none"
                />
                <Input
                  label="Certificate URL"
                  value={certificateUrl}
                  onChangeText={(text) => {
                    clearError();
                    setCertificateUrl(text);
                  }}
                  placeholder="https://example.com/certificate.pdf"
                  autoCapitalize="none"
                  keyboardType="url"
                />
              </Section>

              <AlertBanner message={error} />

              <ScreenActionButton
                title="Complete training"
                onPress={handleSubmitPress}
                loading={submitting}
              />
            </>
          ) : null}

          <ConfirmModal {...confirmModalProps} />
        </>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  backButton: {
    marginBottom: spacing.lg,
  },
  section: {
    marginTop: 0,
  },
});
