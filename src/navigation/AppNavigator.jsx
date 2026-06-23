import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';

import LoginScreen from '../screens/auth/LoginScreen';
import BottomTabs from './BottomTabs';
import { LoadingSpinner } from '../components/common';
import { restoreAuth } from '../store/slices/authSlice';
import { Storage, STORAGE_KEYS } from '../utils/storage';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hydrateAuth = async () => {
      const auth = await Storage.get(STORAGE_KEYS.AUTH);

      if (auth?.token) {
        dispatch(restoreAuth(auth));
      }

      setIsLoading(false);
    };

    hydrateAuth();
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="Main" component={BottomTabs} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
