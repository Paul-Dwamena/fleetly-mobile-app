import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing, shadows, typography, surfaces } from '../../theme';
import { formatDateTime } from '../../utils/format/date';
import { dateToIsoDateTime } from '../../utils/format/dateTime';

export default function DateTimePickerField({
  label,
  value,
  onChange,
  maximumDate = new Date(),
  minimumDate,
  style,
}) {
  const [androidStep, setAndroidStep] = useState(null);

  const displayValue = formatDateTime(dateToIsoDateTime(value)) ?? 'Select date and time';

  const handleIosChange = (_event, selectedDate) => {
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  const handleAndroidDateChange = (event, selectedDate) => {
    if (event.type === 'dismissed') {
      setAndroidStep(null);
      return;
    }

    if (selectedDate) {
      const next = new Date(value);
      next.setFullYear(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        selectedDate.getDate(),
      );
      onChange(next);
      setAndroidStep('time');
    }
  };

  const handleAndroidTimeChange = (event, selectedDate) => {
    setAndroidStep(null);

    if (event.type === 'dismissed' || !selectedDate) {
      return;
    }

    const next = new Date(value);
    next.setHours(selectedDate.getHours(), selectedDate.getMinutes(), 0, 0);
    onChange(next);
  };

  return (
    <View style={[styles.container, style]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      {Platform.OS === 'ios' ? (
        <View style={styles.iosPickerWrap}>
          <DateTimePicker
            value={value}
            mode="datetime"
            display="spinner"
            onChange={handleIosChange}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
            themeVariant="light"
          />
        </View>
      ) : (
        <>
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => setAndroidStep('date')}
            style={styles.field}
            accessibilityRole="button"
            accessibilityLabel={label}
          >
            <Text style={styles.fieldText}>{displayValue}</Text>
            <Icon name="calendar-outline" size={22} color={colors.primary[600]} />
          </TouchableOpacity>

          {androidStep === 'date' ? (
            <DateTimePicker
              value={value}
              mode="date"
              display="default"
              onChange={handleAndroidDateChange}
              maximumDate={maximumDate}
              minimumDate={minimumDate}
            />
          ) : null}

          {androidStep === 'time' ? (
            <DateTimePicker
              value={value}
              mode="time"
              display="default"
              onChange={handleAndroidTimeChange}
            />
          ) : null}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.label,
    color: colors.slate[800],
    marginBottom: spacing.sm,
    fontWeight: '700',
  },
  field: {
    minHeight: 48,
    borderWidth: 1.5,
    borderColor: colors.slate[300],
    borderRadius: 12,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: surfaces.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    ...shadows.sm,
  },
  fieldText: {
    flex: 1,
    fontSize: 16,
    color: colors.slate[900],
    fontWeight: '500',
  },
  iosPickerWrap: {
    borderWidth: 1.5,
    borderColor: colors.slate[300],
    borderRadius: 12,
    backgroundColor: surfaces.card,
    overflow: 'hidden',
    ...shadows.sm,
  },
});
