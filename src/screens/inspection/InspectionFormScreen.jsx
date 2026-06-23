import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';import {
  AlertBanner,
  ConfirmModal,
  LoadingSpinner,
  Screen,
  ScreenActionButton,
  Section,
  useConfirmModal,
} from '../../components/common';
import ChecklistItem from './components/ChecklistItem';
import InspectionFormSummaryCard from './components/InspectionFormSummaryCard';
import {
  createInspection,
  getInspectionTemplate,
} from '../../services/inspectionService';
import { MOCK_INSPECTION_DEFAULTS } from '../../mocks/inspectionMock';
import { getApiError } from '../../utils/api/error';
import { spacing } from '../../theme';

export default function InspectionFormScreen({ route, navigation }) {
  const { templateId } = route.params;
  const { confirm, confirmModalProps } = useConfirmModal();
  const [template, setTemplate] = useState(null);
  const [answers, setAnswers] = useState({});
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

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        setError('');
        setLoading(true);
        const data = await getInspectionTemplate(templateId);
        setTemplate(data);

        const initialAnswers = {};
        (data.items ?? []).forEach((item) => {
          initialAnswers[item.id] = { passed: null, remarks: '' };
        });
        setAnswers(initialAnswers);
      } catch (err) {
        showError(getApiError(err));
      } finally {
        setLoading(false);
      }
    };

    loadTemplate();
  }, [templateId]);

  useEffect(() => {
    if (template?.name) {
      navigation.setOptions({ title: template.name });
    }
  }, [template?.name, navigation]);

  const updateAnswer = (itemId, field, value) => {
    if (error) {
      setError('');
    }

    setAnswers((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value,
      },
    }));
  };

  const submitInspection = async () => {
    const items = template?.items ?? [];

    setError('');
    setSubmitting(true);

    try {
      const payload = {
        vehicleId: MOCK_INSPECTION_DEFAULTS.vehicleId,
        templateId,
        operatorId: MOCK_INSPECTION_DEFAULTS.operatorId,
        items: items.map((item) => ({
          templateItemId: item.id,
          passed: answers[item.id].passed,
          remarks: answers[item.id].remarks.trim() || 'All good',
        })),
      };

      const result = await createInspection(payload);

      Alert.alert(
        'Inspection submitted',
        'Your vehicle inspection has been recorded.',
        [
          {
            text: 'View details',
            onPress: () =>
              navigation.replace('InspectionDetail', {
                inspectionId: result.id,
              }),
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
    const items = template?.items ?? [];
    const incomplete = items.find((item) => answers[item.id]?.passed === null);

    if (incomplete) {
      showError('Please mark every item as pass or fail.');
      return;
    }

    const missingRemarks = items.find(
      (item) =>
        answers[item.id]?.passed === false &&
        !answers[item.id]?.remarks?.trim(),
    );

    if (missingRemarks) {
      showError('Please add remarks for every failed item.');
      return;
    }

    confirm({
      title: 'Submit inspection?',
      message:
        'Your checklist answers will be sent to your fleet manager. You cannot edit them after submitting.',
      confirmLabel: 'Submit',
      onConfirm: submitInspection,
    });
  };

  if (loading) {
    return (
      <Screen>
        <LoadingSpinner fullScreen />
      </Screen>
    );
  }

  const items = template?.items ?? [];

  return (
    <Screen scroll scrollRef={scrollRef}>
      {template ? <InspectionFormSummaryCard template={template} /> : null}

      <Section
        title="Checklist"
        subtitle="Mark each item as pass or fail"
        style={styles.section}
        contentFlush
      >
        {items.map((item, index) => (
          <ChecklistItem
            key={item.id}
            item={item}
            passed={answers[item.id]?.passed}
            remarks={answers[item.id]?.remarks ?? ''}
            isLast={index === items.length - 1}
            onPassChange={(value) => updateAnswer(item.id, 'passed', value)}
            onRemarksChange={(value) => updateAnswer(item.id, 'remarks', value)}
          />
        ))}
      </Section>

      <AlertBanner message={error} />

      <ScreenActionButton
        title="Submit inspection"
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
