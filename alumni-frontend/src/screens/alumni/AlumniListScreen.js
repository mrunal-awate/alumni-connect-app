// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
// import { AuthContext } from '../../context/AuthContext';
// import { getAllUsers } from '../../api/api';

// export default function AlumniListScreen({ navigation }) {
//   const { token } = useContext(AuthContext);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const res = await getAllUsers(token);
//       if (res?.users) {
//         setUsers(res.users);
//       } else {
//         console.log('No users found');
//       }
//     } catch (err) {
//       console.log('Error fetching users:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity 
//       style={styles.card} 
//       onPress={() => navigation.navigate('AlumniDetail', { userId: item._id })}
//     >
//       <Text style={styles.name}>{item.name}</Text>
//       <Text style={styles.info}>{item.branch} - {item.graduationYear}</Text>
//       <Text style={styles.info}>{item.company || 'N/A'}</Text>
//     </TouchableOpacity>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       data={users}
//       keyExtractor={(item) => item._id}
//       renderItem={renderItem}
//       contentContainerStyle={styles.container}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 10 },
//   loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   card: {
//     padding: 15,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     marginBottom: 10,
//     backgroundColor: '#fff',
//   },
//   name: { fontSize: 18, fontWeight: 'bold' },
//   info: { fontSize: 14, color: '#555' },
// });



import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import { getAllUsers } from '../../api/api';

export default function AlumniListScreen({ navigation }) {
  const { token } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await getAllUsers(token);
      if (res?.users) {
        setUsers(res.users);
      } else {
        console.log('No users found');
        Alert.alert('Info', 'No alumni found');
      }
    } catch (err) {
      console.log('Error fetching users:', err);
      Alert.alert('Error', 'Failed to fetch alumni');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('AlumniDetail', { userId: item._id })}
    >
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.info}>{item.branch || 'N/A'} - {item.graduationYear || 'N/A'}</Text>
      <Text style={styles.info}>{item.company || 'N/A'}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={users}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      ListEmptyComponent={() => (
        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <Text>No alumni found.</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { padding: 10 },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  name: { fontSize: 18, fontWeight: 'bold' },
  info: { fontSize: 14, color: '#555' },
});
