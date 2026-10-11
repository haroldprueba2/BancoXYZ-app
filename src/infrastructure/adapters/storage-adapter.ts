import * as SecureStore from 'expo-secure-store';

export class StorageAdapter {
	static async getItem(key: string): Promise<string | null> {
		return SecureStore.getItemAsync(key);
	}

	static async setItem(key: string, value: string): Promise<void> {
		return SecureStore.setItemAsync(key, value);
	}

	static async removeItem(key: string): Promise<void> {
		return SecureStore.deleteItemAsync(key);
	}
}
