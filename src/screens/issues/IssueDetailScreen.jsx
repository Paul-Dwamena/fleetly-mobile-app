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
import IssueSummaryCard from './components/IssueSummaryCard';
import { getIssue } from '../../services/issueService';
import { getApiError } from '../../utils/api/error';
import { formatDateTime } from '../../utils/format/date';
import { spacing } from '../../theme';
import { getPriorityBadge } from './utils/issueStatus';

export default function IssueDetailScreen({ route, navigation }) {
  const { issueId } = route.params;
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadIssue = async () => {
      try {
        setError('');
        setLoading(true);
        const data = await getIssue(issueId);
        setIssue(data);
      } catch (err) {
        setError(getApiError(err));
      } finally {
        setLoading(false);
      }
    };

    loadIssue();
  }, [issueId]);

  if (loading) {
    return (
      <Screen>
        <LoadingSpinner fullScreen />
      </Screen>
    );
  }

  const priorityBadge = issue?.priority ? getPriorityBadge(issue.priority) : null;

  return (
    <Screen scroll>
      <AlertBanner message={error} />

      {error && !issue ? (
        <Button
          title="Go back"
          variant="secondary"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
      ) : null}

      {issue ? (
        <>
          <IssueSummaryCard issue={issue} />

          <Section
            title="Issue information"
            subtitle="Vehicle and report details"
            style={styles.section}
          >
            <ProfileDetailRow
              icon="car-outline"
              label="Vehicle"
              value={issue.vehicleName}
            />
            <ProfileDetailRow
              icon="flag-outline"
              label="Priority"
              value={priorityBadge?.label ?? issue.priority}
            />
            <ProfileDetailRow
              icon="time-outline"
              label="Reported"
              value={formatDateTime(issue.reportedAt)}
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
