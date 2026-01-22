// // src/navigation/RootNavigator.js
// import React, { useContext } from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { ActivityIndicator, View } from 'react-native';
// import { AuthContext } from '../context/AuthContext';

// // Screens
// import LoginScreen from '../screens/auth/LoginScreen';
// import RegisterScreen from '../screens/auth/RegisterScreen';
// import HomeScreen from '../screens/HomeScreen';
// import ProfileScreen from '../screens/profile/ProfileScreen';
// import WelcomeScreen from '../screens/WelcomeScreen';
// import AlumniListScreen from '../screens/alumni/AlumniListScreen';
// import AlumniDetailScreen from '../screens/alumni/AlumniDetailScreen';


// const Stack = createNativeStackNavigator();         // Create a stack navigator

// export default function RootNavigator() {
//   const { user, loading } = useContext(AuthContext);        // Get user and loading state from AuthContext

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <Stack.Navigator>
//       {user ? (
//         <>
//           <Stack.Screen
//             name="Home"
//             component={HomeScreen}
//             options={{ headerShown: true, title: 'Home' }}
//           />
//           <Stack.Screen
//             name="Profile"
//             component={ProfileScreen}
//             options={{ headerShown: true, title: 'My Profile' }}
//           />
//           <Stack.Screen 
//           name="AlumniList" 
//           component={AlumniListScreen} 
//           options={{ title: 'Alumni List' }} 
//           />
//           <Stack.Screen 
//           name="AlumniDetail" 
//           component={AlumniDetailScreen} 
//           options={{ title: 'Alumni Details' }} 
//           />
//         </>
//       ) : (
//         <>
//           <Stack.Screen
//             name="Welcome"
//             component={WelcomeScreen}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Login"
//             component={LoginScreen}
//             options={{ headerShown: false }}
//           />
//           <Stack.Screen
//             name="Register"
//             component={RegisterScreen}
//             options={{ headerShown: false }}
//           />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// }











// ----------------------------- upper one is main ------ changes start from below here --------------------

















// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { ActivityIndicator, View } from "react-native";
// import { AuthContext } from "../context/AuthContext";
// import AppNavigator from "./AppNavigator";

// export default function RootNavigator() {
//   const { loading } = React.useContext(AuthContext);

//   if (loading) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <AppNavigator />
//     </NavigationContainer>
//   );
// }










// --------------------- upper one is main ------ changes start from below here --------------------












// src/navigation/RootNavigator.js
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator, View } from "react-native";
import { AuthContext } from "../context/AuthContext";
import AppNavigator from "./AppNavigator";

export default function RootNavigator() {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}







// ----------------------------- upper one is main ------ changes start from below here --------------------






// import React, { useContext } from "react";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { AuthContext } from "../context/AuthContext";

// /* -------- Auth Screens -------- */
// import LoginScreen from "../screens/auth/LoginScreen";
// import RegisterScreen from "../screens/auth/RegisterScreen";

// /* -------- Bottom Tabs -------- */
// import AppTabs from "./app/AppTabs";

// /* -------- Stack Screens (above tabs) -------- */
// import AlumniDetailScreen from "../screens/alumni/AlumniDetailScreen";
// // future:
// // import CreatePostScreen from "../screens/posts/CreatePostScreen";
// // import EventDetailScreen from "../screens/events/EventDetailScreen";

// const Stack = createNativeStackNavigator();

// export default function AppNavigator() {
//   const { user, loading } = useContext(AuthContext);

//   // ⏳ Prevent navigation flicker while auth is loading
//   if (loading) return null;

//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       {user ? (
//         <>
//           {/* 🔹 Bottom Tab Navigator */}
//           <Stack.Screen
//             name="MainTabs"
//             component={AppTabs}
//           />

//           {/* 🔹 Screens that open ABOVE tabs */}
//           <Stack.Screen
//             name="AlumniDetail"
//             component={AlumniDetailScreen}
//           />

//           {/* 🔮 Future extensions */}
//           {/*
//           <Stack.Screen name="CreatePost" component={CreatePostScreen} />
//           <Stack.Screen name="EventDetail" component={EventDetailScreen} />
//           */}
//         </>
//       ) : (
//         <>
//           {/* 🔐 Auth Flow */}
//           <Stack.Screen name="Login" component={LoginScreen} />
//           <Stack.Screen name="Register" component={RegisterScreen} />
//         </>
//       )}
//     </Stack.Navigator>
//   );
// }
