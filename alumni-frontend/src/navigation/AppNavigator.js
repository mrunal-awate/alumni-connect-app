// import React from 'react';
// // import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import LoginScreen from '../screens/auth/LoginScreen';
// import RegisterScreen from '../screens/auth/RegisterScreen';
// import HomeScreen from '../screens/HomeScreen';
// import ProfileScreen from '../screens/profile/ProfileScreen';
// import AlumniListScreen from '../screens/alumni/AlumniListScreen';
// import AlumniDetailScreen from '../screens/alumni/AlumniDetailScreen';


// const Stack = createNativeStackNavigator();               // Create a stack navigator

// export default function AppNavigator() {
//   return (
//     // <NavigationContainer>
//       <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown:true}}>
//         <Stack.Screen name="Login" component={LoginScreen} />
//         <Stack.Screen name="Register" component={RegisterScreen} />
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Profile" component={ProfileScreen} />
//         <Stack.Screen name="AlumniList" component={AlumniListScreen} options={{ title: 'Alumni List' }} />
//         <Stack.Screen name="AlumniDetail" component={AlumniDetailScreen} options={{ title: 'Alumni Details' }} /> 

//       </Stack.Navigator>
//     // </NavigationContainer>
//   );
// }










// --------------------------------upper one is main ------ changes start from below here --------------------












import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../context/AuthContext";

/* ----------- Screens ----------- */
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";

import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import AlumniListScreen from "../screens/alumni/AlumniListScreen";
import AlumniDetailScreen from "../screens/alumni/AlumniDetailScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="AlumniList" component={AlumniListScreen} />
            <Stack.Screen name="AlumniDetail" component={AlumniDetailScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
