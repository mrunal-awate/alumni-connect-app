// // context/AuthContext.js
// import React, { createContext, useState, useEffect } from 'react';
// import { saveToken, getToken, deleteToken } from '../utils/secureStore';
// import { getJson, loginUser } from '../api/api';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Initialize auth on app start
//   useEffect(() => {
//     const initializeAuth = async () => {
//       let storedToken = null;
//       try {
//         storedToken = await getToken('userToken');
//         if (storedToken) {
//           setToken(storedToken);

//           // Fetch current user
//           try {
//             // Assuming getJson handles the Authorization header internally
//             const res = await getJson('/me', storedToken); 
            
//             if (res && res.success && res.user) {
//               setUser(res.user);
//             } else {
//               // Server responded but indicated failure (e.g., token invalid)
//               console.log('Stored token invalid or expired, removing:', res?.message || 'Unknown reason.');
//               await deleteToken('userToken');
//               setToken(null);
//               setUser(null);
//             }
//           } catch (err) {
//             // Catches network/server errors during user fetch
//             console.error('Error fetching user with token (likely server error or network issue):', err.message);
//             await deleteToken('userToken');
//             setToken(null);
//             setUser(null);
//           }
//         }
//       } catch (err) {
//         console.error('Critical Error during auth initialization:', err.message);
//         // Ensure cleanup even if token storage fails
//         await deleteToken('userToken').catch(() => {});
//         setToken(null);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     initializeAuth();
//   }, []); // Run only once on mount

//   // Login function
//   const login = async (email, password) => {
//     const trimmedEmail = email.trim().toLowerCase();
//     const trimmedPassword = password.trim();

//     if (!trimmedEmail || !trimmedPassword) {
//       // Throwing standard Error here so the LoginScreen can catch and display it.
//       throw new Error('Email and password are required.');
//     }

//     try {
//       // IMPORTANT: The "Server error" is likely thrown inside loginUser or by the backend.
//       // You may need to review the implementation of loginUser in '../api/api.js'.
//       const res = await loginUser({ email: trimmedEmail, password: trimmedPassword });

//       if (res && res.success && res.token && res.user) {
//         await saveToken('userToken', res.token);
//         setToken(res.token);
//         setUser(res.user);
//         return res.user;
//       } else {
//         // Handle explicit error response from the API (e.g., invalid credentials message)
//         const errorMessage = res?.message || 'Invalid credentials. Please check your email and password.';
//         console.warn('API reported failed login:', errorMessage);
//         throw new Error(errorMessage);
//       }
//     } catch (err) {
//       // This catches network errors (like server down, connection refused) or errors 
//       // explicitly thrown by the loginUser API utility (like HTTP 500 Server Error).
//       const finalError = err.message || 'Login failed due to a network or unexpected server error.';
//       console.error('Login request failed:', finalError);
      
//       // Re-throw the error so LoginScreen can handle the UI
//       throw new Error(finalError);
//     }
//   };

//   // Logout function
//   const logout = async () => {
//     try {
//       await deleteToken('userToken');
//       setToken(null);
//       setUser(null);
//     } catch (err) {
//       console.error('Logout error:', err.message);
//     }
//   };

//   // Update user locally
//   const updateUser = (updatedUser) => {
//     if (updatedUser && typeof updatedUser === 'object') {
//       setUser(prev => ({ ...prev, ...updatedUser }));
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, setUser: updateUser, token, login, logout, loading }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };













// ---------------- upper one is main ------ changes start from below here --------------------









import React, { createContext, useEffect, useState } from "react";
import { saveToken, getToken, deleteToken } from "../utils/secureStore";
import { loginUser, getMe } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* -------------------- Load user on app start -------------------- */
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await getToken("userToken");
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await getMe();
        if (res.success) {
          setUser(res.user);
        } else {
          await deleteToken("userToken");
          setUser(null);
        }
      } catch (err) {
          console.log("Auth error:", err.message);

          // Logout ONLY if backend says unauthorized
          if (err.response?.status === 401 || err.response?.status === 403) {
            await deleteToken("userToken");
            setUser(null);
          }
      } 

      setLoading(false);
    };

    loadUser();
  }, []);

  /* -------------------------- Login -------------------------- */
  const login = async (email, password) => {
    const res = await loginUser({ email, password });

    if (!res.success) throw new Error(res.message || "Login failed");

    await saveToken("userToken", res.token);
    setUser(res.user);
    return res.user;
  };

  /* -------------------------- Logout -------------------------- */
  const logout = async () => {
    await deleteToken("userToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
