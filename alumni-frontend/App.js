// // App.js
// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { AuthProvider } from './src/context/AuthContext';
// import RootNavigator from './src/navigation/RootNavigator';

// export default function App() {                 // Main App component
//   return (
//     <AuthProvider>
//       <NavigationContainer>
//         <RootNavigator />
//       </NavigationContainer>
//     </AuthProvider>
//   );
// }


//Hello



// ---------------------upper one is main ------ changes start from below here --------------------









import React from "react";
import { AuthProvider } from "./src/context/AuthContext";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
