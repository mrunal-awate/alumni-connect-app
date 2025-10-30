// screens/HomeScreen.js
import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.log('Logout error:', err);
      Alert.alert('Error', 'Failed to logout');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Welcome{user?.name ? `, ${user.name}` : ''}!
      </Text>
      <Text style={{ marginBottom: 20 }}>
        This is the Home screen (you are logged in).
      </Text>

      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />

      <View style={{ marginTop: 20 }}>
        <Button title="Log out" onPress={handleLogout} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  title: { fontSize: 20, marginBottom: 10, fontWeight: 'bold' },
});
