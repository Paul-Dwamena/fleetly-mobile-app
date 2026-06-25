import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  AlertBanner,
  Button,
  LoadingSpinner,
  Screen,
  Section,
} from '../../components/common';
import InspectionChecklistResultItem from './components/InspectionChecklistResultItem';
import InspectionSummaryCard from './components/InspectionSummaryCard';
import { getInspection } from '../../services/inspectionService';
import { getApiError } from '../../utils/api/error';
import { spacing } from '../../theme';

export default function InspectionDetailScreen({ route, navigation }) {
  const { inspectionId } = route.params;
  const [inspection, setInspection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadInspection = async () => {
      try {
        setError('');
        setLoading(true);
        const data = await getInspection(inspectionId);
        setInspection(data);
      } catch (err) {
        setError(getApiError(err));
      } finally {
        setLoading(false);
      }
    };

    loadInspection();
  }, [inspectionId]);

  useEffect(() => {
    if (inspection?.templateName) {
      navigation.setOptions({ title: inspection.templateName });
    }
  }, [inspection?.templateName, navigation]);

  if (loading) {
    return (
      <Screen>
        <LoadingSpinner fullScreen />
      </Screen>
    );
  }

  const items = inspection?.items ?? [];

  return (
    <Screen scroll>
      <AlertBanner message={error} />

      {error ? (
        <Button
          title="Go back"
          variant="secondary"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
      ) : null}

      {inspection ? (
        <>
          <InspectionSummaryCard inspection={inspection} />

          <Section title="Checklist results" style={styles.section} contentFlush>
            {items.map((item, index) => (
              <InspectionChecklistResultItem
                key={`${item.question}-${index}`}
                item={item}
                isLast={index === items.length - 1}
              />
            ))}
          </Section>
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
