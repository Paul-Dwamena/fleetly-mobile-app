import React, { useCallback, useState } from 'react';
import {
  RefreshControl,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
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
  const authUser = useSelector((state) => state.auth.user);
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

  const vehicle = overview?.currentAsset ?? null;
  const driverName = [authUser?.firstName, authUser?.lastName].filter(Boolean).join(' ')
    || overview?.email?.split('@')[0]
    || 'Driver';

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
            companyName={driverName}
          />
          <View style={styles.headerText}>
            {overview?.location ? (
              <Text style={styles.companyLabel} numberOfLines={1}>
                {overview.location}
              </Text>
            ) : null}
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.driverName} numberOfLines={2}>
              {driverName}
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
        subtitle="Your driving performance"
        contentFlush
      >
        <View style={styles.statsGrid}>
          <StatCard
            variant="cell"
            index={0}
            title="Safety score"
            value={String(overview?.safetyScore ?? 0)}
            icon="shield-checkmark-outline"
          />
          <StatCard
            variant="cell"
            index={1}
            title="Incidents"
            value={String(overview?.incidents ?? 0)}
            icon="warning-outline"
            iconColor={colors.warning[700]}
          />
          <StatCard
            variant="cell"
            index={2}
            title="Safety rating"
            value={overview?.safetyRating ?? '—'}
            icon="ribbon-outline"
          />
          <StatCard
            variant="cell"
            index={3}
            title="Percentile"
            value={overview?.percentile ?? '—'}
            icon="trending-up-outline"
          />
        </View>
      </Section>

      <Section
        title="Quick actions"
        subtitle="Common tasks you can do right now"
        contentStyle={{backgroundColor: colors.primary[50]}}
        contentFlush
      >
        <View style={styles.quickActionsGrid}>
          <QuickActionCard
            title="Start inspection"
            description="Complete your daily vehicle check before you drive."
            icon="clipboard-outline"
            style={styles.quickActionCell}
            onPress={() =>
              navigation.navigate('Inspection', {
                screen: 'InspectionList',
              })
            }
          />
          <QuickActionCard
            title="Report an issue"
            description="Tell your fleet manager about a problem with your vehicle."
            icon="warning-outline"
            iconColor={colors.warning[700]}
            accentColor={colors.warning[700]}
            style={styles.quickActionCell}
            onPress={() =>
              navigation.navigate('Issues', { screen: 'IssueList' })
            }
          />
          <QuickActionCard
            title="Request a vehicle"
            description="Need a replacement while yours is unavailable?"
            icon="car-outline"
            style={styles.quickActionCell}
            onPress={() =>
              navigation.navigate('VehicleRequests', { screen: 'VehicleRequestList' })
            }
          />
          <QuickActionCard
            title="Report accident"
            description="Notify your fleet manager about a vehicle incident."
            icon="car-sport-outline"
            iconColor={colors.danger[700]}
            accentColor={colors.danger[700]}
            style={styles.quickActionCell}
            onPress={() =>
              navigation.navigate('Accidents', { screen: 'AccidentList' })
            }
          />
          <QuickActionCard
            title="Complete training"
            description="Finish assigned courses to stay compliant with fleet requirements."
            icon="school-outline"
            style={styles.quickActionCell}
            onPress={() =>
              navigation.navigate('Training', { screen: 'TrainingList' })
            }
          />
        </View>
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
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    padding: spacing.sm,
    marginBottom: spacing.lg,
  },
  quickActionCell: {
    width: '48%',
  },
});
