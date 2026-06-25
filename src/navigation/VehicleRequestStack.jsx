import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import VehicleRequestListScreen from '../screens/vehicleRequest/VehicleRequestListScreen';
import SubmitVehicleRequestScreen from '../screens/vehicleRequest/SubmitVehicleRequestScreen';
import VehicleRequestDetailScreen from '../screens/vehicleRequest/VehicleRequestDetailScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

const headerOptions = {
  headerStyle: { backgroundColor: colors.white },
  headerTintColor: colors.primary[700],
  headerTitleStyle: { fontWeight: '600' },
  headerShadowVisible: false,
  headerBackTitle: 'Back',
};

export default function VehicleRequestStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="VehicleRequestList"
        component={VehicleRequestListScreen}
        options={{ ...headerOptions, title: 'Vehicle requests' }}
      />
      <Stack.Screen
        name="SubmitVehicleRequest"
        component={SubmitVehicleRequestScreen}
        options={{ ...headerOptions, title: 'New request' }}
      />
      <Stack.Screen
        name="VehicleRequestDetail"
        component={VehicleRequestDetailScreen}
        options={{ ...headerOptions, title: 'Request details' }}
      />
    </Stack.Navigator>
  );
}
