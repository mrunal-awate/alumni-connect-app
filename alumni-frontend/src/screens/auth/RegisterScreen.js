// // screens/auth/RegisterScreen.js
// import React, { useState, useContext } from 'react';
// import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator, Keyboard } from 'react-native';
// import { registerUser } from '../../api/api';
// import { AuthContext } from '../../context/AuthContext'; // ✅ Correct import

// export default function RegisterScreen({ navigation }) {
//   const { login } = useContext(AuthContext); // optional auto-login
//   const [name, setName] = useState('');                                    // User's full name
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleRegister = async () => {
//     const trimmedName = name.trim();
//     const trimmedEmail = email.trim();
//     const trimmedPassword = password.trim();

//     if (!trimmedName || !trimmedEmail || !trimmedPassword) {
//       Alert.alert('Error', 'Please fill all fields');
//       return;
//     }

//     setLoading(true);
//     Keyboard.dismiss();

//     try {
//       const res = await registerUser({
//         name: trimmedName,
//         email: trimmedEmail,
//         password: trimmedPassword,
//       });

//       if (res.success) {
//         Alert.alert(
//           'Registered!',
//           'You can now login.',
//           [
//             {
//               text: 'OK',
//               onPress: () => {
//                 setName('');
//                 setEmail('');
//                 setPassword('');
//                 navigation.replace('Login'); // Navigate to login screen
//               },
//             },
//           ],
//           { cancelable: false }
//         );

//         // Optional: Auto-login after registration
//         // try {
//         //   await login(trimmedEmail, trimmedPassword);
//         // } catch (err) {
//         //   console.log('Auto-login failed:', err.message);
//         // }
//       } else {
//         Alert.alert('Error', res.message || 'Registration failed');
//       }
//     } catch (err) {
//       console.error('Registration error:', err.message);
//       Alert.alert('Error', err.message || 'Could not register. Please check your network or try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Register</Text>

//       <TextInput
//         placeholder="Name"
//         value={name}
//         onChangeText={setName}
//         style={styles.input}
//       />
//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         style={styles.input}
//         autoCapitalize="none"
//       />
//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         style={styles.input}
//       />

//       <Button
//         title={loading ? 'Registering...' : 'Register'}
//         onPress={handleRegister}
//         disabled={loading}
//       />

//       {loading && <ActivityIndicator size="small" color="#0000ff" style={{ marginTop: 10 }} />}

//       <View style={{ marginTop: 20 }}>
//         <Button title="Back to Login" onPress={() => navigation.navigate('Login')} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, justifyContent: 'center' },
//   title: { fontSize: 22, marginBottom: 20, fontWeight: 'bold', textAlign: 'center' },
//   input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
// });











// ----------------------------------upper one is main ------ changes start from below here --------------------












import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { registerUser } from "../../api/api";

const colleges = ["SITS", "NBN", "SCOE", "SKNCOE", "RMD", "SIT"];
const branches = ["Computer", "IT", "ENTC", "Civil", "Mechanical"];

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    college: "",
    branch: "",
    batch: "",
    role: "student",
  });
  const [error, setError] = useState("");

  const register = async () => {
    try {
      setError("");

      const payload = {
        ...form,
        role: form.role.toLowerCase().trim(), // 🔥 FIX: ensure enum match
        college: form.college.trim(),
        branch: form.branch.trim(),
        batch: form.batch.trim(),
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
      };

      await registerUser(payload);
      navigation.replace("Login");
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Join Sinhgad Alumni</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput placeholder="Name" style={styles.input} onChangeText={(v) => setForm({ ...form, name: v })} />
      <TextInput placeholder="Email" style={styles.input} autoCapitalize="none" onChangeText={(v) => setForm({ ...form, email: v })} />
      <TextInput placeholder="Password" style={styles.input} secureTextEntry onChangeText={(v) => setForm({ ...form, password: v })} />

      <TextInput placeholder="College (SITS / NBN / SCOE...)" style={styles.input} onChangeText={(v) => setForm({ ...form, college: v })} />
      <TextInput placeholder="Branch (Computer / IT / ENTC...)" style={styles.input} onChangeText={(v) => setForm({ ...form, branch: v })} />
      <TextInput placeholder="Batch (2021 / 2022)" style={styles.input} onChangeText={(v) => setForm({ ...form, batch: v })} />
      <TextInput placeholder="Role (student / alumni)" style={styles.input} onChangeText={(v) => setForm({ ...form, role: v })} />

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={{ color: "#fff" }}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f5f7fa" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  link: { textAlign: "center", marginTop: 20, color: "#2563eb" },
  error: { color: "red", marginBottom: 10, textAlign: "center" },
});
