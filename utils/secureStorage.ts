import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";
const USER_DATA_KEY = "user_data";

export const secureStorage = {
  setToken: async (token: string) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token, {
      keychainAccessible: SecureStore.WHEN_UNLOCKED,
    });
  },

  getToken: async () => {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  },

  removeToken: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },

  setUserData: async (data: Record<string, any>) => {
    await SecureStore.setItemAsync(USER_DATA_KEY, JSON.stringify(data), {
      keychainAccessible: SecureStore.WHEN_UNLOCKED,
    });
  },

  getUserData: async <T = Record<string, any>>(): Promise<T | null> => {
    const data = await SecureStore.getItemAsync(USER_DATA_KEY);
    return data ? JSON.parse(data) : null;
  },

  removeUserData: async () => {
    await SecureStore.deleteItemAsync(USER_DATA_KEY);
  },
};
