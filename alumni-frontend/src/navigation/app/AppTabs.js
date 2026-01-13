import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/HomeScreen';
import MembersScreen from '../../screens/MembersScreen';
import ProfileScreen from '../../screens/ProfileScreen';

const Tab = createBottomTabNavigator();                 // Create a bottom tab navigator

export default function AppTabs() {             // AppTabs component  
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />               // Home tab
      <Tab.Screen name="Members" component={MembersScreen} />         // Members tab
      <Tab.Screen name="Profile" component={ProfileScreen} />         // Profile tab
    </Tab.Navigator>
  );
}
