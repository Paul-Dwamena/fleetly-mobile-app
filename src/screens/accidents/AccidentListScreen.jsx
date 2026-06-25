import React, { useCallback, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
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
import AccidentListItem from './components/AccidentListItem';
import { getMyAccidents } from '../../services/accidentService';
import { getApiError } from '../../utils/api/error';
import { colors, spacing } from '../../theme';

export default function AccidentListScreen() {
  const navigation = useNavigation();
  const [accidents, setAccidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadAccidents = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError('');
      const data = await getMyAccidents();
      const list = Array.isArray(data) ? data : data?.content ?? [];
      list.sort(
        (a, b) =>
          new Date(b.incidentDate).getTime() - new Date(a.incidentDate).getTime(),
      );
      setAccidents(list);
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadAccidents();
    }, []),
  );

  if (loading && accidents.length === 0 && !error) {
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
          onRefresh={() => loadAccidents(true)}
          colors={[colors.primary[600]]}
          tintColor={colors.primary[600]}
        />
      }
    >
      <ScreenHeader
        title="Accidents"
        subtitle="Report incidents and track case updates from your fleet manager"
      />

      <ScreenActionButton
        title="Report accident"
        variant="danger"
        onPress={() => navigation.navigate('ReportAccident')}
      />

      <AlertBanner message={error} />

      {error ? (
        <Button
          title="Try again"
          variant="secondary"
          onPress={() => loadAccidents()}
          style={styles.retryButton}
        />
      ) : null}

      <Section title="Your accident reports" style={styles.section} contentFlush>
        {accidents.length === 0 ? (
          <View style={styles.emptyWrap}>
            <EmptyState
              icon="car-sport-outline"
              title="No accidents reported"
              message="Tap the button above to report an incident to your fleet manager."
            />
          </View>
        ) : (
          <ListSection embedded>
            <FlatList
              data={accidents}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <AccidentListItem
                  accident={item}
                  isLast={index === accidents.length - 1}
                  onPress={() =>
                    navigation.navigate('AccidentDetail', { accidentId: item.id })
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
