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
import IssueListItem from './components/IssueListItem';
import { getMyIssues } from '../../services/issueService';
import { getApiError } from '../../utils/api/error';
import { colors, spacing } from '../../theme';

export default function IssueListScreen() {
  const navigation = useNavigation();
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadIssues = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError('');
      const data = await getMyIssues();
      const list = Array.isArray(data) ? data : data?.content ?? [];
      list.sort(
        (a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime(),
      );
      setIssues(list);
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadIssues();
    }, []),
  );

  if (loading && issues.length === 0 && !error) {
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
          onRefresh={() => loadIssues(true)}
          colors={[colors.primary[600]]}
          tintColor={colors.primary[600]}
        />
      }
    >
      <ScreenHeader
        title="Issues"
        subtitle="Report problems and track responses from your fleet manager"
      />

      <ScreenActionButton
        title="Report an issue"
        variant="danger"
        onPress={() => navigation.navigate('ReportIssue')}
      />

      <AlertBanner message={error} />

      {error ? (
        <Button
          title="Try again"
          variant="secondary"
          onPress={() => loadIssues()}
          style={styles.retryButton}
        />
      ) : null}

      <Section title="Your reported issues" style={styles.section} contentStyle={{height: '100%'}} contentFlush>
        {issues.length === 0 ? (
          <View style={styles.emptyWrap}>
            <EmptyState
              icon="warning-outline"
              title="No issues reported"
              message="Tap the button above to tell your fleet manager about a vehicle problem."
            />
          </View>
        ) : (
          <ListSection embedded>
            <FlatList
              data={issues}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <IssueListItem
                  issue={item}
                  isLast={index === issues.length - 1}
                  onPress={() =>
                    navigation.navigate('IssueDetail', { issueId: item.id })
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
