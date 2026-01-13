import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import AlumniListScreen from '../screens/alumni/AlumniListScreen';
import AlumniDetailScreen from '../screens/alumni/AlumniDetailScreen';


const Stack = createNativeStackNavigator();               // Create a stack navigator

export default function AppNavigator() {
  return (
    // <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:true}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="AlumniList" component={AlumniListScreen} options={{ title: 'Alumni List' }} />
        <Stack.Screen name="AlumniDetail" component={AlumniDetailScreen} options={{ title: 'Alumni Details' }} /> 

      </Stack.Navigator>
    // </NavigationContainer>
  );
}
