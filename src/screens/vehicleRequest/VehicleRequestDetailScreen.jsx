import React from 'react';
import { StyleSheet } from 'react-native';
import { AlertBanner, Screen, Section } from '../../components/common';
import ProfileDetailRow from '../profile/components/ProfileDetailRow';
import VehicleRequestSummaryCard from './components/VehicleRequestSummaryCard';
import { formatDateTime } from '../../utils/format/date';
import { spacing } from '../../theme';

export default function VehicleRequestDetailScreen({ route }) {
  const { request } = route.params;

  if (!request) {
    return (
      <Screen scroll>
        <AlertBanner message="Request details are unavailable. Go back and open the request again." />
      </Screen>
    );
  }

  const hasReviewDetails =
    request.reviewedAt || request.reviewedByName || request.adminComment;

  return (
    <Screen scroll>
      <VehicleRequestSummaryCard request={request} />

      <Section
        title="Request information"
        subtitle="Vehicle and submission details"
        style={styles.section}
      >
        <ProfileDetailRow
          icon="car-outline"
          label="Vehicle"
          value={request.vehicleName}
        />
        <ProfileDetailRow
          icon="person-outline"
          label="Driver"
          value={request.driverName}
        />
        <ProfileDetailRow
          icon="time-outline"
          label="Submitted"
          value={formatDateTime(request.createdAt)}
          isLast={!hasReviewDetails}
        />
      </Section>

      {hasReviewDetails ? (
        <Section
          title="Review"
          subtitle="Fleet manager response"
          style={styles.section}
        >
          {request.reviewedByName ? (
            <ProfileDetailRow
              icon="person-circle-outline"
              label="Reviewed by"
              value={request.reviewedByName}
              isLast={!request.reviewedAt && !request.adminComment}
            />
          ) : null}
          {request.reviewedAt ? (
            <ProfileDetailRow
              icon="calendar-outline"
              label="Reviewed"
              value={formatDateTime(request.reviewedAt)}
              isLast={!request.adminComment}
            />
          ) : null}
          {request.adminComment ? (
            <ProfileDetailRow
              icon="chatbubble-ellipses-outline"
              label="Comment"
              value={request.adminComment}
              isLast
            />
          ) : null}
        </Section>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 0,
  },
});
