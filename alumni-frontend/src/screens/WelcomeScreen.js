// screens/WelcomeScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Alumni App</Text>
      <View style={{ marginBottom: 10 }}>
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
      </View>
      <View>
        <Button title="Register" onPress={() => navigation.navigate('Register')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 30, fontWeight: 'bold', textAlign: 'center' },
});
