import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { StatusBadge } from '../../../components/common';
import { listItemStyles as styles } from '../../../components/common/listItemStyles';
import { colors } from '../../../theme';

export default function InspectionTemplateListItem({
  template,
  onPress,
  isLast = false,
}) {
  const itemsCount = template.itemsCount

  return (
    <TouchableOpacity
      style={[styles.row, isLast && styles.rowLast]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {template.name}
        </Text>
        {template.description ? (
          <Text style={styles.meta} numberOfLines={2}>
            {template.description}
          </Text>
        ) : null}
        <View style={styles.badgeRow}>
          <StatusBadge
            size="compact"
            label={`${itemsCount} checklist items`}
            status="active"
          />
        </View>
      </View>
      <Icon name="chevron-forward" size={18} color={colors.slate[400]} />
    </TouchableOpacity>
  );
}
