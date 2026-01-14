// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image, Platform } from 'react-native';
// import { AuthContext } from '../../context/AuthContext';
// import { getAllUsers } from '../../api/api';

// // Base URL for backend assets. Use the same IP as in your api.js.
// // NOTE: For web or mobile testing, ensure this IP is correct and accessible.
// const BASE_ASSET_URL = 'http://192.168.0.104:5000';

// export default function AlumniListScreen({ navigation }) {
//   const { token } = useContext(AuthContext);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetchUsers();
//   }, [token]);

//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       // Assuming getAllUsers is updated to return users in the 'users' field
//       const res = await getAllUsers(token);
      
//       if (res?.users) {
//         setUsers(res.users.filter(u => u.photoUrl)); // Only show users with a photo for now
        
//       } else {
//         console.warn('API returned no user data or success=false.', res);
//         setError('No alumni data found.');
//       }
//     } catch (err) {
//       console.error('Error fetching users:', err.message);
//       setError(`Failed to load alumni: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderItem = ({ item }) => {
//     // Determine the photo URL. photoUrl comes back as '/uploads/filename.jpg'
//     const fullPhotoUrl = item.photoUrl ? `${BASE_ASSET_URL}${item.photoUrl}` : null;
    
//     // Use graduationYear if available, otherwise fallback to the legacy 'year' field
//     const yearDisplay = item.graduationYear || item.year || 'N/A';
    
//     return (
//       <TouchableOpacity 
//         style={styles.card} 
//         onPress={() => navigation.navigate('AlumniDetail', { userId: item._id })}
//       >
//         {/* 1. Image Fix: Display the image using the constructed URL */}
//         <Image 
//           source={{ uri: fullPhotoUrl }} 
//           style={styles.image} 
//           onError={(e) => console.log('Image Load Error:', e.nativeEvent.error)}
//         />
        
//         <View style={styles.details}>
//           <Text style={styles.name}>{item.name}</Text>
//           {/* 2. Year Fix: Display the most reliable year field */}
//           <Text style={styles.info}>
//             {item.branch || 'N/A'} - Graduated: {yearDisplay}
//           </Text>
//           <Text style={styles.company}>
//             <Text style={{fontWeight: 'bold'}}>Company:</Text> {item.company || 'Not specified'}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#007AFF" />
//         <Text style={{marginTop: 10, color: '#555'}}>Loading alumni directory...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.loader}>
//         <Text style={styles.errorText}>{error}</Text>
//         <TouchableOpacity style={styles.retryButton} onPress={fetchUsers}>
//           <Text style={styles.retryText}>Tap to Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       data={users}
//       keyExtractor={(item) => item._id}
//       renderItem={renderItem}
//       contentContainerStyle={styles.container}
//       ListEmptyComponent={() => (
//         <View style={{ alignItems: 'center', marginTop: 50, padding: 20 }}>
//           <Text style={{fontSize: 16, color: '#888'}}>No alumni found in the directory.</Text>
//         </View>
//       )}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 10, backgroundColor: '#f5f5f5' },
//   loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   card: {
//     flexDirection: 'row', // Arrange image and text side-by-side
//     alignItems: 'center',
//     padding: 15,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     borderRadius: 12,
//     marginBottom: 10,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   image: {
//     width: 60,
//     height: 60,
//     borderRadius: 30, // Circular image
//     marginRight: 15,
//     backgroundColor: '#e0e0e0', // Placeholder color while loading
//     borderWidth: 1,
//     borderColor: '#ddd'
//   },
//   details: {
//     flex: 1,
//   },
//   name: { 
//     fontSize: 18, 
//     fontWeight: '700', 
//     color: '#333' 
//   },
//   info: { 
//     fontSize: 14, 
//     color: '#555',
//     marginTop: 2
//   },
//   company: {
//     fontSize: 14,
//     color: '#555',
//     marginTop: 2
//   },
//   errorText: {
//     color: '#FF0000',
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 15
//   },
//   retryButton: {
//     backgroundColor: '#007AFF',
//     padding: 10,
//     borderRadius: 5,
//   },
//   retryText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   }
// });







// -----------------------------------------------------------------------------------------------------








// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
// import { AuthContext } from '../../context/AuthContext';
// import { getAllUsers } from '../../api/api';

// const BASE_ASSET_URL = 'http://192.168.0.104:5000';

// export default function AlumniListScreen({ navigation }) {
//   const { token } = useContext(AuthContext);
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (token) fetchUsers();
//   }, [token]);

//   const fetchUsers = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await getAllUsers(token);

//       if (res?.users && res.users.length > 0) {
//         // ✅ FIX: Remove filter that hides alumni without photos
//         setUsers(res.users);
//       } else {
//         setError('No alumni found in the directory.');
//       }
//     } catch (err) {
//       console.error('Error fetching users:', err.message);
//       setError(`Failed to load alumni: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderItem = ({ item }) => {
//     const fullPhotoUrl = item.photoUrl ? `${BASE_ASSET_URL}${item.photoUrl}` : `${BASE_ASSET_URL}/uploads/default.jpg`; // fallback photo
//     const yearDisplay = item.graduationYear || item.year || 'N/A';

//     return (
//       <TouchableOpacity 
//         style={styles.card} 
//         onPress={() => navigation.navigate('AlumniDetail', { userId: item._id })}
//       >
//         <Image 
//           source={{ uri: fullPhotoUrl }} 
//           style={styles.image} 
//           onError={(e) => console.log('Image Load Error:', e.nativeEvent.error)}
//         />
//         <View style={styles.details}>
//           <Text style={styles.name}>{item.name}</Text>
//           <Text style={styles.info}>
//             {item.branch || 'N/A'} - Graduated: {yearDisplay}
//           </Text>
//           <Text style={styles.company}>
//             <Text style={{fontWeight: 'bold'}}>Company:</Text> {item.company || 'Not specified'}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.loader}>
//         <ActivityIndicator size="large" color="#007AFF" />
//         <Text style={{marginTop: 10, color: '#555'}}>Loading alumni directory...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View style={styles.loader}>
//         <Text style={styles.errorText}>{error}</Text>
//         <TouchableOpacity style={styles.retryButton} onPress={fetchUsers}>
//           <Text style={styles.retryText}>Tap to Retry</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       data={users}
//       keyExtractor={(item) => item._id}
//       renderItem={renderItem}
//       contentContainerStyle={styles.container}
//       ListEmptyComponent={() => (
//         <View style={{ alignItems: 'center', marginTop: 50, padding: 20 }}>
//           <Text style={{fontSize: 16, color: '#888'}}>No alumni found in the directory.</Text>
//         </View>
//       )}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 10, backgroundColor: '#f5f5f5' },
//   loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   card: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     borderWidth: 1,
//     borderColor: '#e0e0e0',
//     borderRadius: 12,
//     marginBottom: 10,
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 3,
//   },
//   image: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     marginRight: 15,
//     backgroundColor: '#e0e0e0',
//     borderWidth: 1,
//     borderColor: '#ddd'
//   },
//   details: { flex: 1 },
//   name: { fontSize: 18, fontWeight: '700', color: '#333' },
//   info: { fontSize: 14, color: '#555', marginTop: 2 },
//   company: { fontSize: 14, color: '#555', marginTop: 2 },
//   errorText: { color: '#FF0000', fontSize: 16, textAlign: 'center', marginBottom: 15 },
//   retryButton: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5 },
//   retryText: { color: '#fff', fontWeight: 'bold' },
// });











// ---------------------upper one is main ------ changes start from below here --------------------













import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { getAlumni } from "../../api/api";

export default function AlumniListScreen({ navigation }) {
  const [alumni, setAlumni] = useState([]);
  const [filters, setFilters] = useState({
    college: "",
    branch: "",
    batch: "",
  });

  useEffect(() => {
    loadAlumni();
  }, []);

  const loadAlumni = async () => {
    try {
      const res = await getAlumni(filters);
      setAlumni(res.users || []);
    } catch (err) {
      console.log("Fetch alumni error", err.message);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("AlumniDetail", { id: item._id })}
    >
      <Image
        source={{ uri: item.photoUrl || "https://i.pravatar.cc/100" }}
        style={styles.avatar}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.sub}>
          {item.college} • {item.branch} • {item.batch}
        </Text>
        <Text style={styles.company}>{item.company || "Student"}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f7fa" }}>
      <FlatList
        data={alumni}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 12,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 },
  name: { fontWeight: "bold", fontSize: 16 },
  sub: { color: "#555", fontSize: 12 },
  company: { color: "#2563eb", fontSize: 13 },
});
