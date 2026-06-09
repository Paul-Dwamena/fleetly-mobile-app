import AsyncStorage from "@react-native-async-storage/async-storage";

export const Storage = {
  set: async (key, value) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.log("Storage set error:", err);
    }
  },

  get: async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (err) {
      console.log("Storage get error:", err);
      return null;
    }
  },

  remove: async (key) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (err) {
      console.log("Storage remove error:", err);
    }
  },
};