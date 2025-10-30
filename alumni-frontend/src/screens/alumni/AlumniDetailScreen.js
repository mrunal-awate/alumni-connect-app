// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import { AuthContext } from '../../context/AuthContext';
// import { getUserById } from '../../api/api';

// export default function AlumniDetailScreen({ route }) {
//   const { userId } = route.params;
//   const { token } = useContext(AuthContext);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const fetchUser = async () => {
//     try {
//       const res = await getUserById(userId, token);
//       if (res?.user) {
//         setUser(res.user);
//       } else {
//         console.log('User not found');
//       }
//     } catch (err) {
//       console.log('Error fetching user:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   if (!user) return <Text>User not found</Text>;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.name}>{user.name}</Text>
//       <Text style={styles.info}>Email: {user.email}</Text>
//       <Text style={styles.info}>Branch: {user.branch}</Text>
//       <Text style={styles.info}>Graduation Year: {user.graduationYear}</Text>
//       <Text style={styles.info}>Company: {user.company || 'N/A'}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   name: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
//   info: { fontSize: 16, marginBottom: 5 },
// });


import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { getUserById } from '../../api/api';

export default function AlumniDetailScreen({ route }) {
  const { userId } = route.params;
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const fetchUser = async () => {
    if (!token) {
      Alert.alert('Error', 'No authentication token found.');
      setLoading(false);
      return;
    }

    try {
      const res = await getUserById(userId, token);
      if (res?.user) {
        setUser(res.user);
      } else {
        console.log('User not found:', res);
        Alert.alert('Error', 'User not found.');
      }
    } catch (err) {
      console.log('Error fetching user:', err);
      Alert.alert('Error', 'Failed to fetch user data.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>User not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.info}>Email: {user.email || 'N/A'}</Text>
      <Text style={styles.info}>Branch: {user.branch || 'N/A'}</Text>
      <Text style={styles.info}>Graduation Year: {user.graduationYear || 'N/A'}</Text>
      <Text style={styles.info}>Company: {user.company || 'N/A'}</Text>
      {user.phone && <Text style={styles.info}>Phone: {user.phone}</Text>}
      {user.linkedin && <Text style={styles.info}>LinkedIn: {user.linkedin}</Text>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#fff' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  info: { fontSize: 16, marginBottom: 8 },
  errorText: { fontSize: 18, color: 'red', textAlign: 'center', marginTop: 20 },
});
