// screens/ProfileScreen.js
import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axiosClient';

export default function ProfileScreen() {
  const { user, token, setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    graduationYear: '',
    branch: '',
    company: '',
  });

  const [loading, setLoading] = useState(false);

  // Load user data when component mounts or user changes
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        graduationYear: user.graduationYear || '',
        branch: user.branch || '',
        company: user.company || '',
      });
    }
  }, [user]);

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await api.put('/api/auth/me', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      Alert.alert('Success', 'Profile updated!');
      setUser(res.data.user); // Update AuthContext user
    } catch (err) {
      console.log('Error updating profile:', err);
      Alert.alert('Error', err?.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Profile</Text>

      <Text>Name</Text>
      <TextInput
        style={styles.input}
        value={formData.name}
        onChangeText={text => handleChange('name', text)}
      />

      <Text>Email</Text>
      <TextInput
        style={styles.input}
        value={formData.email}
        editable={false} // Email cannot be changed
      />

      <Text>Graduation Year</Text>
      <TextInput
        style={styles.input}
        value={formData.graduationYear}
        onChangeText={text => handleChange('graduationYear', text)}
      />

      <Text>Branch</Text>
      <TextInput
        style={styles.input}
        value={formData.branch}
        onChangeText={text => handleChange('branch', text)}
      />

      <Text>Company</Text>
      <TextInput
        style={styles.input}
        value={formData.company}
        onChangeText={text => handleChange('company', text)}
      />

      {/* <Text>LinkedIn Url</Text>
      <TextInput
        style={styles.input}
        value={formData.linkdin}
        onChangeText={text => handleChange('linkdin', text)}
      /> */}

      <Button title={loading ? 'Saving...' : 'Save Profile'} onPress={handleSave} disabled={loading} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
