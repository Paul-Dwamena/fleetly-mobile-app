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
import PrioritySelector from './components/PrioritySelector';
import ReportIssueIntroCard from './components/ReportIssueIntroCard';
import { createIssue } from '../../services/issueService';
import { MOCK_ISSUE_DEFAULTS } from '../../mocks/issueMock';
import { getApiError } from '../../utils/api/error';
import { spacing } from '../../theme';

export default function ReportIssueScreen({ navigation }) {
  const { confirm, confirmModalProps } = useConfirmModal();
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
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

  const submitIssue = async () => {
    setError('');
    setSubmitting(true);

    try {
      const result = await createIssue({
        vehicleId: MOCK_ISSUE_DEFAULTS.vehicleId,
        reportedByType: MOCK_ISSUE_DEFAULTS.reportedByType,
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

  return (
    <Screen scroll scrollRef={scrollRef}>
      <ReportIssueIntroCard vehiclePlate={MOCK_ISSUE_DEFAULTS.vehiclePlate} />

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
