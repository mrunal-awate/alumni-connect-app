// screens/auth/RegisterScreen.js
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator, Keyboard } from 'react-native';
import { registerUser } from '../../api/api';
import { AuthContext } from '../../context/AuthContext'; // ✅ Correct import

export default function RegisterScreen({ navigation }) {
  const { login } = useContext(AuthContext); // optional auto-login
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedName || !trimmedEmail || !trimmedPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    Keyboard.dismiss();

    try {
      const res = await registerUser({
        name: trimmedName,
        email: trimmedEmail,
        password: trimmedPassword,
      });

      if (res.success) {
        Alert.alert(
          'Registered!',
          'You can now login.',
          [
            {
              text: 'OK',
              onPress: () => {
                setName('');
                setEmail('');
                setPassword('');
                navigation.replace('Login'); // Navigate to login screen
              },
            },
          ],
          { cancelable: false }
        );

        // Optional: Auto-login after registration
        // try {
        //   await login(trimmedEmail, trimmedPassword);
        // } catch (err) {
        //   console.log('Auto-login failed:', err.message);
        // }
      } else {
        Alert.alert('Error', res.message || 'Registration failed');
      }
    } catch (err) {
      console.error('Registration error:', err.message);
      Alert.alert('Error', err.message || 'Could not register. Please check your network or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <Button
        title={loading ? 'Registering...' : 'Register'}
        onPress={handleRegister}
        disabled={loading}
      />

      {loading && <ActivityIndicator size="small" color="#0000ff" style={{ marginTop: 10 }} />}

      <View style={{ marginTop: 20 }}>
        <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 22, marginBottom: 20, fontWeight: 'bold', textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
});
