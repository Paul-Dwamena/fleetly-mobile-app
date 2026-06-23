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
  Section,
} from '../../components/common';
import InspectionTemplateListItem from './components/InspectionTemplateListItem';
import { getInspectionTemplates } from '../../services/inspectionService';
import { getApiError } from '../../utils/api/error';
import { colors, spacing } from '../../theme';

export default function SelectTemplateScreen() {
  const navigation = useNavigation();
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  const loadTemplates = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError('');
      const data = await getInspectionTemplates();
      setTemplates(Array.isArray(data) ? data : data?.content ?? []);
    } catch (err) {
      setError(getApiError(err));
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadTemplates();
    }, []),
  );

  if (loading && templates.length === 0 && !error) {
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
          onRefresh={() => loadTemplates(true)}
          colors={[colors.primary[600]]}
          tintColor={colors.primary[600]}
        />
      }
    >
      <AlertBanner message={error} />

      {error ? (
        <Button
          title="Try again"
          variant="secondary"
          onPress={() => loadTemplates()}
          style={styles.retryButton}
        />
      ) : null}

      <Section
        title="Available templates"
        subtitle="Choose the inspection type for your vehicle check"
        style={styles.section}
        contentFlush
      >
        {templates.length === 0 ? (
          <View style={styles.emptyWrap}>
            <EmptyState
              icon="clipboard-outline"
              title="No templates available"
              message="Check back later or contact your fleet manager."
            />
          </View>
        ) : (
          <ListSection embedded>
            <FlatList
              data={templates}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              renderItem={({ item, index }) => (
                <InspectionTemplateListItem
                  template={item}
                  isLast={index === templates.length - 1}
                  onPress={() =>
                    navigation.navigate('InspectionForm', { templateId: item.id })
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
