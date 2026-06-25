import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  AlertBanner,
  Button,
  LoadingSpinner,
  Screen,
  Section,
} from '../../components/common';
import ProfileDetailRow from '../profile/components/ProfileDetailRow';
import AccidentSummaryCard from './components/AccidentSummaryCard';
import { getAccident } from '../../services/accidentService';
import { getApiError } from '../../utils/api/error';
import { formatDateTime } from '../../utils/format/date';
import { spacing } from '../../theme';
import { getSeverityBadge } from './utils/accidentStatus';

export default function AccidentDetailScreen({ route, navigation }) {
  const { accidentId } = route.params;
  const [accident, setAccident] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAccident = async () => {
      try {
        setError('');
        setLoading(true);
        const data = await getAccident(accidentId);
        setAccident(data);
      } catch (err) {
        setError(getApiError(err));
      } finally {
        setLoading(false);
      }
    };

    loadAccident();
  }, [accidentId]);

  if (loading) {
    return (
      <Screen>
        <LoadingSpinner fullScreen />
      </Screen>
    );
  }

  const severityBadge = accident?.severity
    ? getSeverityBadge(accident.severity)
    : null;

  return (
    <Screen scroll>
      <AlertBanner message={error} />

      {error && !accident ? (
        <Button
          title="Go back"
          variant="secondary"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
      ) : null}

      {accident ? (
        <>
          <AccidentSummaryCard accident={accident} />

          <Section
            title="Case information"
            subtitle="Incident and vehicle details"
            style={styles.section}
          >
            <ProfileDetailRow
              icon="car-outline"
              label="Vehicle"
              value={accident.vehicle?.vehicleName}
            />
            <ProfileDetailRow
              icon="card-outline"
              label="Plate number"
              value={accident.vehicle?.plateNumber}
            />
            <ProfileDetailRow
              icon="location-outline"
              label="Location"
              value={accident.location}
            />
            <ProfileDetailRow
              icon="time-outline"
              label="Incident date"
              value={formatDateTime(accident.incidentDate)}
            />
            <ProfileDetailRow
              icon="alert-circle-outline"
              label="Severity"
              value={severityBadge?.label ?? accident.severity}
              isLast={!accident.driver?.fullName}
            />
            {accident.driver?.fullName ? (
              <ProfileDetailRow
                icon="person-outline"
                label="Driver"
                value={accident.driver.fullName}
                isLast
              />
            ) : null}
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
