import React, { useCallback, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import {
  AlertBanner,
  Button,
  EmptyState,
  ListSection,
  LoadingSpinner,
  Screen,
  ScreenActionButton,
  ScreenHeader,
  Section,
} from '../../components/common';
import VehicleRequestListItem from './components/VehicleRequestListItem';
import { getMyVehicleRequests } from '../../services/vehicleRequestService';
import { getApiError } from '../../utils/api/error';
import { colors, spacing } from '../../theme';

export default function VehicleRequestListScreen({ navigation }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadRequests = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError('');
      const data = await getMyVehicleRequests();
      setRequests(Array.isArray(data) ? data : data?.content ?? []);
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadRequests();
    }, []),
  );

  if (loading && requests.length === 0 && !error) {
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
          onRefresh={() => loadRequests(true)}
          colors={[colors.primary[600]]}
          tintColor={colors.primary[600]}
        />
      }
    >
      <ScreenHeader
        title="Vehicle requests"
        subtitle="Request a replacement vehicle when yours is unavailable"
      />

      <ScreenActionButton
        title="New vehicle request"
        onPress={() => navigation.navigate('SubmitVehicleRequest')}
      />

      <AlertBanner message={error} />

      {error ? (
        <Button
          title="Try again"
          variant="secondary"
          onPress={() => loadRequests()}
          style={styles.retryButton}
        />
      ) : null}

      <Section title="Your requests" style={styles.section} contentStyle={{height: '100%'}} contentFlush>
        {requests.length === 0 ? (
          <View style={styles.emptyWrap}>
            <EmptyState
              icon="swap-horizontal-outline"
              title="No requests yet"
              message="Tap the button above when you need a temporary replacement vehicle."
            />
          </View>
        ) : (
          <ListSection embedded>
            <FlatList
              data={requests}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <VehicleRequestListItem
                  request={item}
                  isLast={index === requests.length - 1}
                  onPress={() =>
                    navigation.navigate('VehicleRequestDetail', {
                      requestId: item.id,
                    })
                  }
                />
              )}
            />
          </ListSection>
        )}
      </Section>
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
  emptyWrap: {
    padding: spacing.xl,
  },
});
