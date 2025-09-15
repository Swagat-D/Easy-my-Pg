import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  USER_DATA: 'user_data',
  PHONE_NUMBER: 'phone_number',
};

export class StorageService {
  static async setItem(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error('Error storing data:', error);
      throw error;
    }
  }

  static async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  }

  static async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data:', error);
      throw error;
    }
  }

  static async setObject(key: string, value: any): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error storing object:', error);
      throw error;
    }
  }

  static async getObject(key: string): Promise<any | null> {
    try {
      const value = await AsyncStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error retrieving object:', error);
      return null;
    }
  }

  // Auth specific methods
  static async setAuthToken(token: string): Promise<void> {
    await this.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
  }

  static async getAuthToken(): Promise<string | null> {
    return await this.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  }

  static async setUserData(userData: any): Promise<void> {
    await this.setObject(STORAGE_KEYS.USER_DATA, userData);
  }

  static async getUserData(): Promise<any | null> {
    return await this.getObject(STORAGE_KEYS.USER_DATA);
  }

  static async clearAuthData(): Promise<void> {
    await Promise.all([
      this.removeItem(STORAGE_KEYS.ACCESS_TOKEN),
      this.removeItem(STORAGE_KEYS.USER_DATA),
    ]);
  }
}