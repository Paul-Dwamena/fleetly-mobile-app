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
import VehicleRequestSummaryCard from './components/VehicleRequestSummaryCard';
import { getVehicleRequest } from '../../services/vehicleRequestService';
import { getApiError } from '../../utils/api/error';
import { formatDateTime } from '../../utils/format/date';
import { spacing } from '../../theme';

export default function VehicleRequestDetailScreen({ route, navigation }) {
  const { requestId } = route.params;
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRequest = async () => {
      try {
        setError('');
        setLoading(true);
        const data = await getVehicleRequest(requestId);
        setRequest(data);
      } catch (err) {
        setError(getApiError(err));
      } finally {
        setLoading(false);
      }
    };

    loadRequest();
  }, [requestId]);

  if (loading) {
    return (
      <Screen>
        <LoadingSpinner fullScreen />
      </Screen>
    );
  }

  const vehicleDetails = [request?.vehicleMake, request?.vehicleModel]
    .filter(Boolean)
    .join(' ');

  return (
    <Screen scroll>
      <AlertBanner message={error} />

      {error && !request ? (
        <Button
          title="Go back"
          variant="secondary"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
      ) : null}

      {request ? (
        <>
          <VehicleRequestSummaryCard request={request} />

          <Section
            title="Request information"
            subtitle="Vehicle and submission details"
            style={styles.section}
          >
            <ProfileDetailRow
              icon="car-outline"
              label="Vehicle plate"
              value={request.vehiclePlate}
            />
            <ProfileDetailRow
              icon="construct-outline"
              label="Make & model"
              value={vehicleDetails || '—'}
            />
            <ProfileDetailRow
              icon="time-outline"
              label="Requested"
              value={formatDateTime(request.requestedAt)}
              isLast
            />
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
