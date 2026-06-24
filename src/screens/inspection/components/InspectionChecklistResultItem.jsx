import React from 'react';
import { Text, View } from 'react-native';
import { StatusBadge } from '../../../components/common';
import { listItemStyles as styles } from '../../../components/common/listItemStyles';

export default function InspectionChecklistResultItem({ item, isLast = false }) {
  return (
    <View style={[styles.row, isLast && styles.rowLast]}>
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={[styles.title, styles.labelFlex]} numberOfLines={2}>
            {item.question ?? item.label}
          </Text>
          <StatusBadge
            size="compact"
            label={item.passed ? 'Passed' : 'Failed'}
            status={item.passed ? 'active' : 'danger'}
          />
        </View>
        {item.remarks ? (
          <Text style={styles.remarks}>{item.remarks}</Text>
        ) : null}
      </View>
    </View>
  );
}
