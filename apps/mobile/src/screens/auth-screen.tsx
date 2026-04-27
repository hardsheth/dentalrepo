import * as SecureStore from 'expo-secure-store';

export async function persistToken(token: string): Promise<void> {
  await SecureStore.setItemAsync('accessToken', token);
}
