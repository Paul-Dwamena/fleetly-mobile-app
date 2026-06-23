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
  ScreenHeader,
  Section,
} from '../../components/common';
import TrainingListItem from './components/TrainingListItem';
import { getMyTrainings } from '../../services/trainingService';
import { getApiError } from '../../utils/api/error';
import { colors, spacing } from '../../theme';

export default function TrainingListScreen({ navigation }) {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadTrainings = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError('');
      const data = await getMyTrainings();
      setTrainings(Array.isArray(data) ? data : data?.content ?? []);
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTrainings();
    }, []),
  );

  if (loading && trainings.length === 0 && !error) {
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
          onRefresh={() => loadTrainings(true)}
          colors={[colors.primary[600]]}
          tintColor={colors.primary[600]}
        />
      }
    >
      <ScreenHeader
        title="Training"
        subtitle="Complete assigned courses to stay compliant with fleet requirements"
      />

      <AlertBanner message={error} />

      {error ? (
        <Button
          title="Try again"
          variant="secondary"
          onPress={() => loadTrainings()}
          style={styles.retryButton}
        />
      ) : null}

      <Section title="Your trainings" style={styles.section} contentStyle={{height: '100%'}} contentFlush>
        {trainings.length === 0 ? (
          <View style={styles.emptyWrap}>
            <EmptyState
              icon="school-outline"
              title="No trainings assigned"
              message="Your fleet manager will assign courses when they are required."
            />
          </View>
        ) : (
          <ListSection embedded>
            <FlatList
              data={trainings}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <TrainingListItem
                  training={item}
                  isLast={index === trainings.length - 1}
                  onPress={() =>
                    navigation.navigate('TrainingDetail', {
                      trainingId: item.id,
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
