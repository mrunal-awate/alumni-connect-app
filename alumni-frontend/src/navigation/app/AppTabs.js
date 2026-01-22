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

import HomeScreen from "../../screens/HomeScreen";
import AlumniListScreen from "../../screens/alumni/AlumniListScreen";
import ProfileScreen from "../../screens/profile/ProfileScreen";

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










// ----------------------------------- upper one is main ------ changes start from below here --------------------









// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";

// /* -------- Screens -------- */
// import HomeScreen from "../../screens/HomeScreen";
// import AlumniListScreen from "../../screens/alumni/AlumniListScreen";
// import ProfileScreen from "../../screens/profile/ProfileScreen";

// /* Future screens */
// // import EventsScreen from "../../screens/events/EventsScreen";

// const Tab = createBottomTabNavigator();

// export default function AppTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false, // LinkedIn-style (headers inside screens)

//         tabBarHideOnKeyboard: true,

//         tabBarIcon: ({ color, size }) => {
//           let iconName = "ellipse";

//           switch (route.name) {
//             case "Home":
//               iconName = "home";
//               break;
//             case "Alumni":
//               iconName = "people";
//               break;
//             case "Events":
//               iconName = "calendar";
//               break;
//             case "Profile":
//               iconName = "person";
//               break;
//           }

//           return <Ionicons name={iconName} size={size} color={color} />;
//         },

//         tabBarActiveTintColor: "#2563eb",
//         tabBarInactiveTintColor: "#777",

//         tabBarStyle: {
//           height: 62,
//           paddingBottom: 6,
//           paddingTop: 6,
//           backgroundColor: "#fff",
//           borderTopWidth: 0.5,
//           borderTopColor: "#eee",
//         },

//         tabBarLabelStyle: {
//           fontSize: 12,
//           fontWeight: "600",
//         },
//       })}
//     >
//       {/* Home Feed */}
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//       />

//       {/* Alumni Directory */}
//       <Tab.Screen
//         name="Alumni"
//         component={AlumniListScreen}
//       />

//       {/* Events (NEXT PHASE) */}
//       {/*
//       <Tab.Screen
//         name="Events"
//         component={EventsScreen}
//       />
//       */}

//       {/* Profile (last tab) */}
//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{ unmountOnBlur: true }}
//       />
//     </Tab.Navigator>
//   );
// }









// ----------------------------------- upper one is main ------ changes end here --------------------









// import React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Ionicons } from "@expo/vector-icons";

// /* -------- Screens -------- */
// import HomeScreen from "../../screens/HomeScreen";
// import AlumniListScreen from "../../screens/alumni/AlumniListScreen";
// import ProfileScreen from "../../screens/profile/ProfileScreen";

// /* -------- Future Screens -------- */
// // import EventsScreen from "../../screens/events/EventsScreen";

// const Tab = createBottomTabNavigator();

// export default function AppTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false, // headers handled inside screens

//         tabBarHideOnKeyboard: true,

//         tabBarIcon: ({ color, size }) => {
//           let iconName;

//           switch (route.name) {
//             case "Home":
//               iconName = "home-outline";
//               break;
//             case "Alumni":
//               iconName = "people-outline";
//               break;
//             case "Events":
//               iconName = "calendar-outline";
//               break;
//             case "Profile":
//               iconName = "person-outline";
//               break;
//             default:
//               iconName = "ellipse-outline";
//           }

//           return <Ionicons name={iconName} size={size} color={color} />;
//         },

//         tabBarActiveTintColor: "#2563eb",
//         tabBarInactiveTintColor: "#777",

//         tabBarStyle: {
//           height: 64,
//           paddingBottom: 6,
//           paddingTop: 6,
//           backgroundColor: "#fff",
//           borderTopWidth: 0.5,
//           borderTopColor: "#e5e7eb",
//         },

//         tabBarLabelStyle: {
//           fontSize: 11,
//           fontWeight: "600",
//         },
//       })}
//     >
//       {/* ---------------- Home Feed ---------------- */}
//       <Tab.Screen
//         name="Home"
//         component={HomeScreen}
//       />

//       {/* ---------------- Alumni Directory ---------------- */}
//       <Tab.Screen
//         name="Alumni"
//         component={AlumniListScreen}
//       />

//       {/* ---------------- Events (Next Phase) ---------------- */}
//       {/*
//       <Tab.Screen
//         name="Events"
//         component={EventsScreen}
//       />
//       */}

//       {/* ---------------- Profile ---------------- */}
//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{
//           unmountOnBlur: true, // ensures fresh profile reload
//         }}
//       />
//     </Tab.Navigator>
//   );
// }
