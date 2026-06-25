import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TrainingListScreen from '../screens/training/TrainingListScreen';
import TrainingDetailScreen from '../screens/training/TrainingDetailScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

const headerOptions = {
  headerStyle: { backgroundColor: colors.white },
  headerTintColor: colors.primary[700],
  headerTitleStyle: { fontWeight: '600' },
  headerShadowVisible: false,
  headerBackTitle: 'Back',
};

export default function TrainingStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TrainingList"
        component={TrainingListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TrainingDetail"
        component={TrainingDetailScreen}
        options={{ ...headerOptions, title: 'Training details' }}
      />
    </Stack.Navigator>
  );
}
