import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, spacing } from '../../../theme';

export default function VehicleSelector({ vehicles, value, onChange }) {
  if (vehicles.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.label}>Replacement vehicle</Text>
        <Text style={styles.emptyText}>
          No unassigned vehicles are available right now. Contact your fleet
          manager if you still need a replacement.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Replacement vehicle</Text>
      <View style={styles.list}>
        {vehicles.map((vehicle, index) => {
          const isActive = value === vehicle.id;
          const isLast = index === vehicles.length - 1;
          const plate = vehicle.registrationNumber ?? vehicle.plateNumber;
          const details = [vehicle.make, vehicle.model, vehicle.year]
            .filter(Boolean)
            .join(' · ');

          return (
            <TouchableOpacity
              key={vehicle.id}
              style={[
                styles.option,
                isActive && styles.optionActive,
                isLast && styles.optionLast,
              ]}
              onPress={() => onChange(vehicle.id)}
              activeOpacity={0.85}
            >
              <View style={styles.optionContent}>
                <Text style={[styles.plate, isActive && styles.plateActive]}>
                  {plate ?? vehicle.name}
                </Text>
                {details ? (
                  <Text style={[styles.details, isActive && styles.detailsActive]}>
                    {details}
                  </Text>
                ) : null}
              </View>
              <Icon
                name={isActive ? 'checkmark-circle' : 'car-outline'}
                size={22}
                color={isActive ? colors.primary[700] : colors.slate[400]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.slate[800],
    marginBottom: spacing.sm,
    fontWeight: '700',
  },
  emptyText: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.slate[500],
  },
  list: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.slate[200],
    overflow: 'hidden',
  },
  option: {
    minHeight: 64,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.slate[200],
    backgroundColor: colors.white,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  optionLast: {
    borderBottomWidth: 0,
  },
  optionActive: {
    backgroundColor: colors.primary[50],
  },
  optionContent: {
    flex: 1,
    minWidth: 0,
  },
  plate: {
    fontSize: 17,
    lineHeight: 22,
    color: colors.slate[900],
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  plateActive: {
    color: colors.primary[800],
  },
  details: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.slate[600],
  },
  detailsActive: {
    color: colors.primary[700],
    fontWeight: '600',
  },
});
