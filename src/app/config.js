import { Platform } from 'react-native';

// Android emulator uses 10.0.2.2 to reach the host machine's localhost
const DEV_HOST = Platform.OS === 'android' ? '10.0.2.2' : 'localhost';

export const CONFIG = {
  BASE_URL: __DEV__
    ? `http://${DEV_HOST}:8030/api`
    : 'https://fleetly.wigal.com.gh/api',
  TIMEOUT: 15000,
  // Set to false when the backend is ready to test against real endpoints
  USE_MOCK_API: __DEV__,
};
