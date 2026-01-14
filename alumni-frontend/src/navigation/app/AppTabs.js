// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import HomeScreen from '../../screens/HomeScreen';
// import MembersScreen from '../../screens/MembersScreen';
// import ProfileScreen from '../../screens/ProfileScreen';

// const Tab = createBottomTabNavigator();                 // Create a bottom tab navigator

// export default function AppTabs() {             // AppTabs component  
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={HomeScreen} />               // Home tab
//       <Tab.Screen name="Members" component={MembersScreen} />         // Members tab
//       <Tab.Screen name="Profile" component={ProfileScreen} />         // Profile tab
//     </Tab.Navigator>
//   );
// }












// ----------------------------- upper one is main ------ changes start from below here --------------------


















import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/HomeScreen";
import AlumniListScreen from "../screens/alumni/AlumniListScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let icon;
          if (route.name === "Home") icon = "home";
          if (route.name === "Alumni") icon = "people";
          if (route.name === "Profile") icon = "person";
          return <Ionicons name={icon} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Alumni" component={AlumniListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
