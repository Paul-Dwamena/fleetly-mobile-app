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
import InspectionListItem from './components/InspectionListItem';
import { getMyInspections } from '../../services/inspectionService';
import { getApiError } from '../../utils/api/error';
import { colors, spacing } from '../../theme';

export default function InspectionListScreen() {
  const navigation = useNavigation();
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadInspections = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError('');
      const data = await getMyInspections();
      setInspections(Array.isArray(data) ? data : data?.content ?? []);
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadInspections();
    }, []),
  );

  if (loading && inspections.length === 0 && !error) {
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
          onRefresh={() => loadInspections(true)}
          colors={[colors.primary[600]]}
          tintColor={colors.primary[600]}
        />
      }
    >
      <ScreenHeader
        title="Inspections"
        subtitle="Complete checks and review your history"
      />

      <ScreenActionButton
        title="Start new inspection"
        onPress={() => navigation.navigate('SelectTemplate')}
      />

      <AlertBanner message={error} />

      {error ? (
        <Button
          title="Try again"
          variant="secondary"
          onPress={() => loadInspections()}
          style={styles.retryButton}
        />
      ) : null}

      <Section title="Your inspections" style={styles.section} contentStyle={{height: '100%'}} contentFlush>
        {inspections.length === 0 ? (
          <View style={styles.emptyWrap}>
            <EmptyState
              icon="clipboard-outline"
              title="No inspections yet"
              message="Start a new inspection to record your daily vehicle check."
            />
          </View>
        ) : (
          <ListSection embedded>
            <FlatList
              data={inspections}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <InspectionListItem
                  inspection={item}
                  isLast={index === inspections.length - 1}
                  onPress={() =>
                    navigation.navigate('InspectionDetail', {
                      inspectionId: item.id,
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
