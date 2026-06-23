import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StatusBadge } from '../../../components/common';
import { listItemStyles as styles } from '../../../components/common/listItemStyles';
import { colors } from '../../../theme';
import { formatDateTime } from '../../../utils/format/date';
import { getStatusBadge } from '../utils/vehicleRequestStatus';

export default function VehicleRequestListItem({ request, onPress, isLast = false }) {
  const statusBadge = getStatusBadge(request.status);
  const vehicleDetails = [request.vehicleMake, request.vehicleModel]
    .filter(Boolean)
    .join(' ');

  return (
    <TouchableOpacity
      style={[styles.row, isLast && styles.rowLast]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {request.reason}
        </Text>
        <Text style={styles.meta} numberOfLines={1}>
          {request.vehiclePlate}
          {vehicleDetails ? ` · ${vehicleDetails}` : ''}
          {' · '}
          {formatDateTime(request.requestedAt)}
        </Text>
        <View style={styles.badgeRow}>
          <StatusBadge
            size="compact"
            label={statusBadge.label}
            status={statusBadge.status}
          />
        </View>
      </View>
      <Icon name="chevron-forward" size={18} color={colors.slate[400]} />
    </TouchableOpacity>
  );
}
