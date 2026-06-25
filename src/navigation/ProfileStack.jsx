import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProfileScreen from '../screens/profile/ProfileScreen';
import ChangePasswordScreen from '../screens/auth/ChangePasswordScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileMain"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          title: 'Change Password',
          headerStyle: { backgroundColor: colors.white },
          headerTintColor: colors.primary[700],
          headerTitleStyle: { fontWeight: '600' },
          headerShadowVisible: false,
          headerBackTitle: 'Back',
        }}
      />
    </Stack.Navigator>
  );
}
