import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StatusBadge } from '../../../components/common';
import { listItemStyles as styles } from '../../../components/common/listItemStyles';
import { colors } from '../../../theme';
import { formatDate } from '../../../utils/format/date';
import { getStatusBadge } from '../utils/trainingStatus';

export default function TrainingListItem({ training, onPress, isLast = false }) {
  const statusBadge = getStatusBadge(training.status);
  const expiryLabel = formatDate(training.expiryDate);

  return (
    <TouchableOpacity
      style={[styles.row, isLast && styles.rowLast]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {training.type}
        </Text>
        <View style={styles.badgeRow}>
          <StatusBadge
            size="compact"
            label={statusBadge.label}
            status={statusBadge.status}
          />
          {expiryLabel ? (
            <StatusBadge
              size="compact"
              label={`Exp. ${expiryLabel}`}
              status="inactive"
            />
          ) : null}
        </View>
      </View>
      <Icon name="chevron-forward" size={18} color={colors.slate[400]} />
    </TouchableOpacity>
  );
}
