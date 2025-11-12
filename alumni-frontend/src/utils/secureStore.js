// utils/secureStore.js
import * as SecureStore from 'expo-secure-store';

/**
 * Save a value securely in SecureStore
 * @param {string} key - The key to store
 * @param {string} value - The value to store
 * @returns {boolean} - true if saved successfully, false otherwise
 */
export async function saveToken(key, value) {
  try {
    await SecureStore.setItemAsync(key, value.trim());
    console.log(`✅ Token saved successfully for key: ${key}`);
    return true;
  } catch (error) {
    console.error(`❌ Error saving token for key ${key}:`, error);
    return false;
  }
}

/**
 * Retrieve a value from SecureStore
 * @param {string} key - The key to retrieve
 * @returns {string|null} - The stored value or null if not found
 */
export async function getToken(key) {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value ? value.trim() : null;
  } catch (error) {
    console.error(`❌ Error retrieving token for key ${key}:`, error);
    return null;
  }
}

/**
 * Delete a value from SecureStore
 * @param {string} key - The key to delete
 * @returns {boolean} - true if deleted successfully, false otherwise
 */
export async function deleteToken(key) {
  try {
    await SecureStore.deleteItemAsync(key);
    console.log(`🗑️ Token deleted for key: ${key}`);
    return true;
  } catch (error) {
    console.error(`❌ Error deleting token for key ${key}:`, error);
    return false;
  }
}

