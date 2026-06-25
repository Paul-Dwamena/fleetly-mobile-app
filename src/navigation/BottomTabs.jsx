import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeStack from './HomeStack';
import InspectionStack from './InspectionStack';
import IssuesStack from './IssuesStack';
import ProfileStack from './ProfileStack';
import { colors, spacing, surfaces } from '../theme';

const Tab = createBottomTabNavigator();

const TAB_CONTENT_HEIGHT = 56;

const tabIcons = {
  Home: 'home',
  Inspection: 'clipboard',
  Issues: 'warning',
  Profile: 'person',
};

const inactiveColor = colors.slate[500];
const activeColor = colors.white;

function CustomTabBar({ state, descriptors, navigation, insets }) {
  const bottomInset = Math.max(insets.bottom, spacing.sm);

  return (
    <View
      style={[
        styles.tabBar,
        { height: TAB_CONTENT_HEIGHT + bottomInset },
      ]}
    >
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const { options } = descriptors[route.key];
        const label =
          typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : options.title ?? route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            style={[
              styles.tab,
              { paddingBottom: bottomInset },
              focused && styles.tabActive,
            ]}
            accessibilityRole="button"
            accessibilityState={{ selected: focused }}
            accessibilityLabel={label}
          >
            <Icon
              name={tabIcons[route.name]}
              size={focused ? 24 : 22}
              color={focused ? activeColor : inactiveColor}
            />
            <Text
              style={[
                styles.label,
                { color: focused ? activeColor : inactiveColor },
                focused && styles.labelActive,
              ]}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Inspection" component={InspectionStack} />
      <Tab.Screen name="Issues" component={IssuesStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: surfaces.card,
    borderTopWidth: 3,
    borderTopColor: colors.primary[600],
    elevation: 0,
    shadowOpacity: 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabActive: {
    backgroundColor: colors.primary[600],
  },
  label: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: '600',
    marginTop: 3,
  },
  labelActive: {
    fontWeight: '700',
  },
});
