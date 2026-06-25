import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AccidentListScreen from '../screens/accidents/AccidentListScreen';
import ReportAccidentScreen from '../screens/accidents/ReportAccidentScreen';
import AccidentDetailScreen from '../screens/accidents/AccidentDetailScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

const headerOptions = {
  headerStyle: { backgroundColor: colors.white },
  headerTintColor: colors.primary[700],
  headerTitleStyle: { fontWeight: '600' },
  headerShadowVisible: false,
  headerBackTitle: 'Back',
};

export default function AccidentsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AccidentList"
        component={AccidentListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReportAccident"
        component={ReportAccidentScreen}
        options={{ ...headerOptions, title: 'Report accident' }}
      />
      <Stack.Screen
        name="AccidentDetail"
        component={AccidentDetailScreen}
        options={{ ...headerOptions, title: 'Accident details' }}
      />
    </Stack.Navigator>
  );
}
