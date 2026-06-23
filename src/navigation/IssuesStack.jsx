import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IssueListScreen from '../screens/issues/IssueListScreen';
import ReportIssueScreen from '../screens/issues/ReportIssueScreen';
import IssueDetailScreen from '../screens/issues/IssueDetailScreen';
import { colors } from '../theme';

const Stack = createNativeStackNavigator();

const headerOptions = {
  headerStyle: { backgroundColor: colors.white },
  headerTintColor: colors.primary[700],
  headerTitleStyle: { fontWeight: '600' },
  headerShadowVisible: false,
  headerBackTitle: 'Back',
};

export default function IssuesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="IssueList"
        component={IssueListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ReportIssue"
        component={ReportIssueScreen}
        options={{ ...headerOptions, title: 'Report issue' }}
      />
      <Stack.Screen
        name="IssueDetail"
        component={IssueDetailScreen}
        options={{ ...headerOptions, title: 'Issue details' }}
      />
    </Stack.Navigator>
  );
}
