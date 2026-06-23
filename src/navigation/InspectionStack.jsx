import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InspectionListScreen from '../screens/inspection/InspectionListScreen';
import SelectTemplateScreen from '../screens/inspection/SelectTemplateScreen';
import InspectionFormScreen from '../screens/inspection/InspectionFormScreen';
import InspectionDetailScreen from '../screens/inspection/InspectionDetailScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

const headerOptions = {
  headerStyle: { backgroundColor: colors.white },
  headerTintColor: colors.primary[700],
  headerTitleStyle: { fontWeight: '600' },
  headerShadowVisible: false,
  headerBackTitle: 'Back',
};

export default function InspectionStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InspectionList"
        component={InspectionListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SelectTemplate"
        component={SelectTemplateScreen}
        options={{ ...headerOptions, title: 'Choose template' }}
      />
      <Stack.Screen
        name="InspectionForm"
        component={InspectionFormScreen}
        options={{ ...headerOptions, title: 'Complete inspection' }}
      />
      <Stack.Screen
        name="InspectionDetail"
        component={InspectionDetailScreen}
        options={{ ...headerOptions, title: 'Inspection details' }}
      />
    </Stack.Navigator>
  );
}
