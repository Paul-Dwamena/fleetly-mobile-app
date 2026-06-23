import React, { useCallback, useState } from 'react';
import {
  RefreshControl,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  AlertBanner,
  Button,
  CompanyLogo,
  LoadingSpinner,
  Screen,
  Section,
} from '../../components/common';
import StatCard from './components/StatCard';
import AssignedVehicleCard from './components/AssignedVehicleCard';
import QuickActionCard from './components/QuickActionCard';
import { getDriverOverview } from '../../services/driverService';
import { getApiError } from '../../utils/api/error';
import { getGreeting } from '../../utils/format/greeting';
import { colors, spacing, typography, shadows } from '../../theme';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadOverview = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError('');
      const data = await getDriverOverview();
      setOverview(data);
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadOverview();
    }, []),
  );


  if (loading && !overview) {
    return (
      <Screen>
        <LoadingSpinner fullScreen />
      </Screen>
    );
  }

  const vehicle = overview?.assignedVehicle;
  const summary = overview?.summary ?? {};

  return (
    <Screen
      scroll
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => loadOverview(true)}
          colors={[colors.primary[600]]}
          tintColor={colors.primary[600]}
        />
      }
    >
      <View style={styles.headerBlock}>
        <View style={styles.headerGlowPrimary} />
        <View style={styles.headerGlowSecondary} />

        <View style={styles.headerRow}>
          <CompanyLogo
            variant="hero"
            size={68}
            companyName={overview?.company?.name}
            logoUrl={overview?.company?.logoUrl}
          />
          <View style={styles.headerText}>
            {overview?.company?.name ? (
              <Text style={styles.companyLabel} numberOfLines={1}>
                {overview.company.name}
              </Text>
            ) : null}
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.driverName} numberOfLines={2}>
              {overview?.driverName ?? 'Driver'}
            </Text>
          </View>
        </View>
      </View>

      <AlertBanner message={error} />

      {error ? (
        <Button
          title="Try again"
          variant="secondary"
          onPress={() => loadOverview()}
          style={styles.retryButton}
        />
      ) : null}

      <AssignedVehicleCard vehicle={vehicle} />

      <Section
        title="Your summary"
        subtitle="What needs your attention today"
        contentFlush
      >
        <View style={styles.statsGrid}>
          <StatCard
            variant="cell"
            index={0}
            title="Inspections due"
            value={String(summary.inspectionsDue ?? 0)}
            icon="clipboard-outline"
          />
          <StatCard
            variant="cell"
            index={1}
            title="Open issues"
            value={String(summary.openIssues ?? 0)}
            icon="warning-outline"
            iconColor={colors.warning[700]}
            iconBackground={colors.warning[100]}
          />
          <StatCard
            variant="cell"
            index={2}
            title="Trainings"
            value={String(summary.pendingTrainings ?? 0)}
            icon="school-outline"
          />
          <StatCard
            variant="cell"
            index={3}
            title="Requests"
            value={String(summary.vehicleRequests ?? 0)}
            icon="car-outline"
          />
        </View>
      </Section>

      <Section
        title="Quick actions"
        subtitle="Common tasks you can do right now"
        contentStyle={styles.quickActionsSection}
      >
        <QuickActionCard
          title="Start inspection"
          description="Complete your daily vehicle check before you drive."
          buttonTitle="Go to inspection"
          icon="clipboard-outline"
          onPress={() =>
            navigation.navigate('Inspection', {
              screen: 'InspectionList',
            })
          }
        />
        <QuickActionCard
          title="Report an issue"
          description="Tell your fleet manager about a problem with your vehicle."
          buttonTitle="Go to issues"
          icon="warning-outline"
          iconColor={colors.warning[700]}
          iconBackground={colors.warning[100]}
          iconBorderColor={colors.warning[100]}
          accentColor={colors.warning[700]}
          onPress={() =>
            navigation.navigate('Issues', { screen: 'IssueList' })
          }
        />
        <QuickActionCard
          title="Request a vehicle"
          description="Need a replacement while yours is unavailable?"
          buttonTitle="Request vehicle"
          icon="car-outline"
          onPress={() =>
            navigation.navigate('VehicleRequests', { screen: 'VehicleRequestList' })
          }
        />
        <QuickActionCard
          title="Complete training"
          description="Finish assigned courses to stay compliant with fleet requirements."
          buttonTitle="Go to training"
          icon="school-outline"
          onPress={() =>
            navigation.navigate('Training', { screen: 'TrainingList' })
          }
        />
      </Section>

    </Screen>
  );
}

const styles = StyleSheet.create({
  headerBlock: {
    marginHorizontal: -spacing.xl,
    marginTop: -spacing.xl,
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xxl,
    backgroundColor: colors.primary[600],
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
    ...shadows.md,
  },
  headerGlowPrimary: {
    position: 'absolute',
    top: -48,
    right: -36,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  headerGlowSecondary: {
    position: 'absolute',
    bottom: -32,
    left: -24,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  headerText: {
    flex: 1,
    minWidth: 0,
  },
  companyLabel: {
    ...typography.caption,
    color: colors.primary[100],
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: spacing.xs,
  },
  greeting: {
    ...typography.body,
    color: 'rgba(255,255,255,0.88)',
    fontWeight: '500',
  },
  driverName: {
    fontSize: 26,
    lineHeight: 32,
    color: colors.white,
    marginTop: spacing.xs,
    fontWeight: '800',
  },
  retryButton: {
    marginBottom: spacing.lg,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  quickActionsSection: {
    backgroundColor: colors.primary[50],
  },
});
