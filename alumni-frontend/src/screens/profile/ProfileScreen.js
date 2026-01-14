// // screens/ProfileScreen.js
// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
// import { AuthContext } from '../../context/AuthContext';
// import api from '../../api/axiosClient';

// export default function ProfileScreen() {
//   const { user, token, setUser } = useContext(AuthContext);

//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     graduationYear: '',
//     branch: '',
//     company: '',
//   });

//   const [loading, setLoading] = useState(false);

//   // Load user data when component mounts or user changes
//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user.name || '',
//         email: user.email || '',
//         graduationYear: user.graduationYear || '',
//         branch: user.branch || '',
//         company: user.company || '',
//       });
//     }
//   }, [user]);

//   const handleChange = (key, value) => {
//     setFormData({ ...formData, [key]: value });
//   };

//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       const res = await api.put('/api/auth/me', formData, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       Alert.alert('Success', 'Profile updated!');
//       setUser(res.data.user); // Update AuthContext user
//     } catch (err) {
//       console.log('Error updating profile:', err);
//       Alert.alert('Error', err?.response?.data?.message || 'Failed to update profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>My Profile</Text>

//       <Text>Name</Text>
//       <TextInput
//         style={styles.input}
//         value={formData.name}
//         onChangeText={text => handleChange('name', text)}
//       />

//       <Text>Email</Text>
//       <TextInput
//         style={styles.input}
//         value={formData.email}
//         editable={false} // Email cannot be changed
//       />

//       <Text>Graduation Year</Text>
//       <TextInput
//         style={styles.input}
//         value={formData.graduationYear}
//         onChangeText={text => handleChange('graduationYear', text)}
//       />

//       <Text>Branch</Text>
//       <TextInput
//         style={styles.input}
//         value={formData.branch}
//         onChangeText={text => handleChange('branch', text)}
//       />

//       <Text>Company</Text>
//       <TextInput
//         style={styles.input}
//         value={formData.company}
//         onChangeText={text => handleChange('company', text)}
//       />

//       {/* <Text>LinkedIn Url</Text>
//       <TextInput
//         style={styles.input}
//         value={formData.linkdin}
//         onChangeText={text => handleChange('linkdin', text)}
//       /> */}

//       <Button title={loading ? 'Saving...' : 'Save Profile'} onPress={handleSave} disabled={loading} />
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     marginBottom: 15,
//     borderRadius: 5,
//   },
// });












// -------------------------------------------------------------------------

















// // screens/profile/ProfileScreen.js
// import React, { useState, useEffect, useContext } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   Button,
//   StyleSheet,
//   ScrollView,
//   Alert,
//   Image,
//   TouchableOpacity,
//   ActivityIndicator,
// } from 'react-native';
// import { AuthContext } from '../../context/AuthContext';
// import { updateUserProfile, uploadProfilePhoto } from '../../api/api';
// import * as ImagePicker from 'expo-image-picker';

// export default function ProfileScreen() {
//   const { user, token, setUser } = useContext(AuthContext);

//   const [formData, setFormData] = useState({
//     name: '',
//     graduationYear: '',
//     branch: '',
//     company: '',
//   });
//   const [photo, setPhoto] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   useEffect(() => {
//     if (user) {
//       setFormData({
//         name: user.name || '',
//         graduationYear: user.graduationYear || '',
//         branch: user.branch || '',
//         company: user.company || '',
//       });
//       setPhoto(user.photoUrl || null);
//     }
//   }, [user]);

//   const handleChange = (key, value) => setFormData({ ...formData, [key]: value });

//   const pickImage = async () => {
//     const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (!granted) return Alert.alert('Permission required', 'Camera roll permission is required!');

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       quality: 0.7,
//     });

//     if (!result.canceled) setPhoto(result.assets[0].uri);
//   };

//   const handleSave = async () => {
//     setLoading(true);
//     try {
//       const res = await updateUserProfile(formData, token);
//       if (res.success) setUser(res.user);
//       else {
//         Alert.alert('Error', res.message || 'Failed to update profile');
//         setLoading(false);
//         return;
//       }

//       if (photo && photo !== user.photoUrl) {
//         setUploading(true);
//         const photoRes = await uploadProfilePhoto(photo, token);
//         if (photoRes.success) setUser(prev => ({ ...prev, photoUrl: photoRes.photoUrl }));
//         else Alert.alert('Photo Upload Failed', photoRes.message || '');
//         setUploading(false);
//       }

//       Alert.alert('Success', 'Profile updated successfully!');
//     } catch (err) {
//       console.log('Error updating profile:', err);
//       Alert.alert('Error', 'Failed to update profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>My Profile</Text>

//       <TouchableOpacity onPress={pickImage} style={styles.photoContainer}>
//         {photo ? (
//           <Image source={{ uri: photo }} style={styles.photo} />
//         ) : (
//           <View style={styles.photoPlaceholder}>
//             <Text>Select Photo</Text>
//           </View>
//         )}
//       </TouchableOpacity>

//       <Text>Name</Text>
//       <TextInput style={styles.input} value={formData.name} onChangeText={text => handleChange('name', text)} />

//       <Text>Email</Text>
//       <TextInput style={styles.input} value={user.email} editable={false} />

//       <Text>Graduation Year</Text>
//       <TextInput style={styles.input} value={formData.graduationYear} onChangeText={text => handleChange('graduationYear', text)} />

//       <Text>Branch</Text>
//       <TextInput style={styles.input} value={formData.branch} onChangeText={text => handleChange('branch', text)} />

//       <Text>Company</Text>
//       <TextInput style={styles.input} value={formData.company} onChangeText={text => handleChange('company', text)} />

//       {(loading || uploading) ? (
//         <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
//       ) : (
//         <Button title="Save Profile" onPress={handleSave} />
//       )}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: { padding: 20 },
//   title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
//   input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
//   photoContainer: { alignItems: 'center', marginBottom: 20 },
//   photo: { width: 120, height: 120, borderRadius: 60 },
//   photoPlaceholder: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: '#eee',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });













// --------------------------upper one is main ------ changes start from below here --------------------















import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { AuthContext } from "../../context/AuthContext";
import { updateProfile, uploadPhoto } from "../../api/api";
import * as ImagePicker from "expo-image-picker";

export default function ProfileScreen() {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);

  const [form, setForm] = useState({
    name: "",
    company: "",
    city: "",
    bio: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        company: user.company || "",
        city: user.city || "",
        bio: user.bio || "",
      });
      setPhoto(user.photoUrl || null);
    }
  }, [user]);

  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.7,
    });

    if (!result.canceled) setPhoto(result.assets[0].uri);
  };

  const saveProfile = async () => {
    try {
      setLoading(true);
      const res = await updateProfile(form);
      setUser(res.user);

      if (photo && photo !== user.photoUrl) {
        const imgRes = await uploadPhoto(photo);
        setUser(imgRes.user);
      }
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };

  if (!user) return null;

  return (
    <ScrollView style={{ backgroundColor: "#f5f7fa" }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={{ uri: photo || "https://i.pravatar.cc/200" }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.sub}>
          {user.college} • {user.branch} • {user.batch}
        </Text>
      </View>

      <View style={styles.card}>
        <Text>Name</Text>
        <TextInput style={styles.input} value={form.name} onChangeText={(v) => setForm({ ...form, name: v })} />

        <Text>Company</Text>
        <TextInput style={styles.input} value={form.company} onChangeText={(v) => setForm({ ...form, company: v })} />

        <Text>City</Text>
        <TextInput style={styles.input} value={form.city} onChangeText={(v) => setForm({ ...form, city: v })} />

        <Text>Bio</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          value={form.bio}
          onChangeText={(v) => setForm({ ...form, bio: v })}
        />

        {loading ? (
          <ActivityIndicator />
        ) : (
          <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
            <Text style={{ color: "#fff", fontWeight: "bold" }}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  name: { fontSize: 20, fontWeight: "bold", marginTop: 10 },
  sub: { color: "#555" },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    margin: 15,
    borderRadius: 10,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginTop: 5,
    marginBottom: 15,
    borderRadius: 6,
  },
  saveBtn: {
    backgroundColor: "#2563eb",
    padding: 12,
    alignItems: "center",
    borderRadius: 6,
  },
});
