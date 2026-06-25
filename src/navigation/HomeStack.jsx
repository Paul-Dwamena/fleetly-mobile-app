import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/home/HomeScreen';
import TrainingStack from './TrainingStack';
import VehicleRequestStack from './VehicleRequestStack';
import AccidentsStack from './AccidentsStack';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Training" component={TrainingStack} />
      <Stack.Screen name="VehicleRequests" component={VehicleRequestStack} />
      <Stack.Screen name="Accidents" component={AccidentsStack} />
    </Stack.Navigator>
  );
}
