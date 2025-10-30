import * as SecureStore from 'expo-secure-store';

// Save token securely
export async function saveToken(key, value) {
  try {
    await SecureStore.setItemAsync(key, value);
    console.log('✅ Token saved successfully');
  } catch (error) {
    console.error('Error saving token:', error);
  }
}

// Get token
export async function getToken(key) {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
}

// Delete token (for logout)
export async function deleteToken(key) {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log('🗑️ Token deleted');
  } catch (error) {
    console.error('Error deleting token:', error);
  }
}
