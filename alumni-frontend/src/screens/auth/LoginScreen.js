// // screens/auth/LoginScreen.js
// import React, { useState, useContext } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Keyboard, TouchableOpacity } from 'react-native';
// import { AuthContext } from '../../context/AuthContext';

// export default function LoginScreen({ navigation }) {
//   const { login, loading: authLoading } = useContext(AuthContext);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null); // Local state for error messages
//   const [successMessage, setSuccessMessage] = useState(null); // Local state for success messages

//   const handleLogin = async () => {
//     // Clear previous messages
//     setErrorMessage(null);
//     setSuccessMessage(null);

//     const trimmedEmail = email.trim().toLowerCase();
//     const trimmedPassword = password.trim();

//     if (!trimmedEmail || !trimmedPassword) {
//       setErrorMessage('Please enter email and password.');
//       return;
//     }

//     setLoading(true);
//     Keyboard.dismiss();

//     try {
//       // The login function is where the "Server error" occurs, likely due to
//       // an issue in the loginUser implementation in '../api/api.js' or the backend.
//       const user = await login(trimmedEmail, trimmedPassword);

//       if (user && typeof user === 'object') {
//         setSuccessMessage(`Welcome ${user.name || 'User'}! Logging in...`);
//         // The AuthContext handles navigation via state change, so we don't need to explicitly navigate here.
//       } else {
//         // This path is generally covered by the catch block below due to AuthContext's logic
//         setErrorMessage('User data invalid. Please try again.');
//       }
//     } catch (err) {
//       // This handles all errors thrown from AuthContext.login, including 
//       // "Email and password are required" and "Login error: Server error".
//       const message = err.message || 'An unexpected error occurred.';
//       console.warn('LoginScreen failed:', message);
//       setErrorMessage(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (authLoading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#007AFF" />
//         <Text style={styles.loadingText}>Initializing...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Welcome Back</Text>

//       {/* Error Message Box */}
//       {errorMessage && (
//         <View style={styles.errorBox}>
//           <Text style={styles.errorText}>⚠️ Error: {errorMessage}</Text>
//         </View>
//       )}

//       {/* Success Message Box */}
//       {successMessage && (
//         <View style={styles.successBox}>
//           <Text style={styles.successText}>✅ {successMessage}</Text>
//         </View>
//       )}

//       <TextInput
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//         keyboardType="email-address"
//         autoCapitalize="none"
//         style={styles.input}
//       />

//       <TextInput
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//         style={styles.input}
//       />

//       <TouchableOpacity
//         style={[styles.button, (loading || authLoading) && styles.buttonDisabled]}
//         onPress={handleLogin}
//         disabled={loading || authLoading}
//       >
//         <Text style={styles.buttonText}>
//           {loading ? 'Logging in...' : 'Login'}
//         </Text>
//       </TouchableOpacity>

//       {loading && <ActivityIndicator size="small" color="#007AFF" style={{ marginTop: 10 }} />}

//       <View style={{ marginTop: 30 }}>
//         <Button 
//           title="Don't have an account? Register" 
//           onPress={() => navigation.navigate('Register')} 
//           color="#841584"
//         />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { 
//     flex: 1, 
//     padding: 30, 
//     justifyContent: 'center', 
//     backgroundColor: '#f9f9f9' 
//   },
//   loadingContainer: { 
//     flex: 1, 
//     justifyContent: 'center', 
//     alignItems: 'center',
//     backgroundColor: '#f9f9f9',
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#007AFF',
//   },
//   title: { 
//     fontSize: 28, 
//     marginBottom: 30, 
//     fontWeight: '700', 
//     textAlign: 'center', 
//     color: '#333' 
//   },
//   input: { 
//     borderWidth: 1, 
//     borderColor: '#ddd', 
//     padding: 15, 
//     marginBottom: 15, 
//     borderRadius: 8, 
//     backgroundColor: '#fff' 
//   },
//   button: {
//     backgroundColor: '#007AFF',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   buttonDisabled: {
//     backgroundColor: '#A0C4FF',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
//   // Custom Alert Boxes
//   errorBox: {
//     backgroundColor: '#FFEBEE',
//     borderWidth: 1,
//     borderColor: '#FF0000',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   errorText: {
//     color: '#FF0000',
//     fontWeight: '600',
//     fontSize: 14,
//   },
//   successBox: {
//     backgroundColor: '#E8F5E9',
//     borderWidth: 1,
//     borderColor: '#4CAF50',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 20,
//   },
//   successText: {
//     color: '#4CAF50',
//     fontWeight: '600',
//     fontSize: 14,
//   },
// });















// ----------------------------- upper one is main ------ changes start from below here --------------------














import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";

export default function LoginScreen({ navigation }) {
  const { login, loading } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      setError("");
      await login(email, password);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sinhgad Alumni</Text>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.link}>Create new account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#f5f7fa",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#2563eb",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
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
  btnText: { color: "#fff", fontWeight: "bold" },
  link: {
    textAlign: "center",
    marginTop: 20,
    color: "#2563eb",
    fontWeight: "bold",
  },
  error: { color: "red", textAlign: "center", marginBottom: 10 },
});
