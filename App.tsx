import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/store';
import { StatusBar } from 'react-native';
import { colors } from './src/theme';

function App() {
  return (
    <Provider store={store}>
        <StatusBar backgroundColor={colors.primary[600]} barStyle="light-content" />
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
