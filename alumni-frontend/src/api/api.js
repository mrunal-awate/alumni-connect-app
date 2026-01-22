// // api.js
// const API_URL = 'http://192.168.0.104:5000/api'; // Your backend URL

// /**
//  * Helper function to safely parse response body as JSON.
//  * Returns { success: false, message: ... } on parse failure.
//  * @param {Response} res - The fetch Response object.
//  * @returns {Promise<object | {success: boolean, message: string}>}
//  */
// const safeParseJson = async (res) => {
//   try {
//     const text = await res.text();
//     if (!text) {
//       return { success: false, message: `Empty response from server (Status: ${res.status})` };
//     }
//     const data = JSON.parse(text);
//     return data;
//   } catch (e) {
//     return { success: false, message: `Invalid JSON format received from server (Status: ${res.status})` };
//   }
// };


// // Generic GET request
// export async function getJson(path, token) {
//   try {
//     const res = await fetch(`${API_URL}${path}`, {
//       headers: {
//         'Content-Type': 'application/json',
//         ...(token ? { Authorization: `Bearer ${token}` } : {}),
//       },
//     });

//     const data = await safeParseJson(res);

//     if (!res.ok) {
//       return { success: false, message: data.message || `Request failed with status: ${res.status}` };
//     }

//     return data;
//   } catch (err) {
//     // Check for specific network errors (server offline, IP unreachable)
//     const message = err.message.includes('Network request failed') 
//       ? `NETWORK ERROR: Server at ${API_URL} is unreachable.`
//       : err.message;
//     console.error('GET request error:', message);
//     throw new Error(message);
//   }
// }

// // ====================== AUTH APIs ======================

// // Register
// export const registerUser = async (data) => {
//   try {
//     const res = await fetch(`${API_URL}/auth/register`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });

//     if (!res.ok) {
//         const errorJson = await safeParseJson(res);
//         const errorMessage = errorJson.message || `Registration failed with status: ${res.status}`;
//         throw new Error(errorMessage);
//     }

//     const json = await safeParseJson(res);
//     return { success: json.success ?? true, message: json.message || 'Registration successful' };
//   } catch (err) {
//     const message = err.message.includes('Network request failed') 
//       ? `NETWORK ERROR: Server at ${API_URL} is unreachable. Check if the backend is running.`
//       : err.message;
//     console.error('Register request failed:', message);
//     throw new Error(message);
//   }
// };

// // Login 
// export const loginUser = async (data) => {
//   try {
//     const res = await fetch(`${API_URL}/auth/login`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data),
//     });

//     if (!res.ok) {
//       // Server is running, but responded with a failure status (4xx or 5xx)
//       const errorJson = await safeParseJson(res);
//       const statusCode = res.status;
      
//       const errorMessage = errorJson.message || `Server responded with status code ${statusCode}.`;
      
//       console.error(`Login failed with HTTP ${statusCode}:`, errorMessage);
//       throw new Error(errorMessage); 
//     }

//     // Success response (2xx)
//     const json = await safeParseJson(res);

//     if (!json.token || !json.user) {
//       throw new Error(json.message || 'Server response missing token or user data.');
//     }

//     return {
//       success: true,
//       message: json.message || 'Login successful',
//       token: json.token,
//       user: json.user,
//     };
//   } catch (err) {
//     // This catches *Network* errors (e.g., server offline, connection refused)
//     const message = err.message.includes('Network request failed') 
//       ? `NETWORK ERROR: Server at ${API_URL} is unreachable. Check if the backend is running and accessible from your device.`
//       : err.message;
      
//     console.error('Login request failed (Network/Unexpected):', message);
//     throw new Error(message);
//   }
// };

// // ====================== USER APIs ======================

// export const getAllUsers = async (token) => getJson('/users', token);
// export const getUserById = async (id, token) => getJson(`/users/${id}`, token);

// // Update profile
// // FIX APPLIED: Changed endpoint from '/me' to '/users/update' to match backend user routes setup
// export const updateUserProfile = async (data, token) => {
//   try {
//     // The correct endpoint is /api/users/update, based on your server routes.
//     const res = await fetch(`${API_URL}/users/update`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(data),
//     });

//     const json = await safeParseJson(res);

//     if (!res.ok) {
//       const errorMessage = json.message || `Update failed with status: ${res.status}`;
//       throw new Error(errorMessage);
//     }

//     return { success: true, message: json.message || 'Update successful', user: json.user || null };
//   } catch (err) {
//     const message = err.message.includes('Network request failed') 
//       ? `NETWORK ERROR: Server at ${API_URL} is unreachable.`
//       : err.message;
//     console.error('Update profile error:', message);
//     throw new Error(message);
//   }
// };

// // Upload profile photo
// export const uploadProfilePhoto = async (photoUri, token) => {
//   try {
//     const formData = new FormData();
//     formData.append('photo', {
//       uri: photoUri,
//       name: 'profile.jpg',
//       type: 'image/jpeg',
//     });

//     const res = await fetch(`${API_URL}/users/upload-photo`, {
//       method: 'POST',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//       body: formData,
//     });

//     const json = await safeParseJson(res);

//     if (!res.ok) {
//       const errorMessage = json.message || `Photo upload failed with status: ${res.status}`;
//       throw new Error(errorMessage);
//     }

//     return { success: true, message: json.message || 'Photo upload successful', imageUrl: json.imageUrl || null };
//   } catch (err) {
//     const message = err.message.includes('Network request failed') 
//       ? `NETWORK ERROR: Server at ${API_URL} is unreachable.`
//       : err.message;
//     console.error('Upload photo error:', message);
//     throw new Error(message);
//   }
// };





// api/api.js
// Base URL — make sure it matches your backend (run `ipconfig` to confirm your local IP)
const API_URL = 'http://192.168.0.102:5000/api';                  // Update this to your backend server address(local IP for testing)

/* -------------------------------------------------------------------------- */
/*                             🧩 HELPER FUNCTIONS                             */
/* -------------------------------------------------------------------------- */

/**
 * Safely parse a JSON response body.
 * Prevents crashes on empty or invalid responses.
 */
const safeParseJson = async (res) => {
  try {
    const text = await res.text();
    if (!text) {
      return { success: false, message: `Empty response from server (status ${res.status})` };
    }
    return JSON.parse(text);
  } catch (e) {
    return { success: false, message: `Invalid JSON format received from server (status ${res.status})` };
  }
};

/**
 * Generic GET request wrapper with optional token.
 */
export async function getJson(path, token) {
  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const data = await safeParseJson(res);

    if (!res.ok) {
      const msg = data.message || `Request failed with status ${res.status}`;
      console.error(`❌ GET ${path} → ${msg}`);
      return { success: false, message: msg };
    }

    return data;
  } catch (err) {
    const msg = err.message.includes('Network request failed')
      ? `NETWORK ERROR: Could not reach backend at ${API_URL}`
      : err.message;
    console.error('🌐 GET error:', msg);
    throw new Error(msg);
  }
}

/* -------------------------------------------------------------------------- */
/*                               🔐 AUTH ROUTES                                */
/* -------------------------------------------------------------------------- */

/**
 * Register a new user.
 */
export const registerUser = async (data) => {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await safeParseJson(res);
    if (!res.ok) throw new Error(json.message || `Registration failed (status ${res.status})`);

    return { success: json.success ?? true, message: json.message || 'Registration successful' };
  } catch (err) {
    const msg = err.message.includes('Network request failed')
      ? `NETWORK ERROR: Backend not reachable at ${API_URL}`
      : err.message;
    console.error('Register error:', msg);
    throw new Error(msg);
  }
};

/**
 * Login user and return token + user data.
 */
export const loginUser = async (data) => {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await safeParseJson(res);
    if (!res.ok) throw new Error(json.message || `Login failed (status ${res.status})`);

    if (!json.token || !json.user) {
      throw new Error('Login succeeded but server response is missing token or user.');
    }

    return { success: true, message: json.message || 'Login successful', token: json.token, user: json.user };
  } catch (err) {
    const msg = err.message.includes('Network request failed')
      ? `NETWORK ERROR: Backend not reachable at ${API_URL}`
      : err.message;
    console.error('Login error:', msg);
    throw new Error(msg);
  }
};

/* -------------------------------------------------------------------------- */
/*                               👥 USER ROUTES                                */
/* -------------------------------------------------------------------------- */

/**
 * Fetch all users (alumni directory).
 * ✅ FIXED: Explicitly check for .success=false responses
 * ✅ FIXED: Added defensive return if API path changes
 */
export const getAllUsers = async (token) => {
  const data = await getJson('/users', token);
  if (!data || data.success === false) {
    return { users: [] };
  }
  return data;
};

/**
 * Fetch single user by ID.
 */
export const getUserById = async (id, token) => getJson(`/users/${id}`, token);

/**
 * Update user profile (basic info).
 */
export const updateUserProfile = async (data, token) => {
  try {
    const res = await fetch(`${API_URL}/users/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const json = await safeParseJson(res);
    if (!res.ok) throw new Error(json.message || `Update failed (status ${res.status})`);

    return { success: true, message: json.message || 'Profile updated successfully', user: json.user || null };
  } catch (err) {
    const msg = err.message.includes('Network request failed')
      ? `NETWORK ERROR: Backend not reachable at ${API_URL}`
      : err.message;
    console.error('Update profile error:', msg);
    throw new Error(msg);
  }
};

/**
 * Upload profile photo (multipart/form-data)
 */
export const uploadProfilePhoto = async (photoUri, token) => {
  try {
    const formData = new FormData();
    formData.append('photo', {
      uri: photoUri,
      name: 'profile.jpg',
      type: 'image/jpeg',
    });

    const res = await fetch(`${API_URL}/users/upload-photo`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const json = await safeParseJson(res);
    if (!res.ok) throw new Error(json.message || `Photo upload failed (status ${res.status})`);

    return {
      success: true,
      message: json.message || 'Photo uploaded successfully',
      imageUrl: json.imageUrl || json.photoUrl || null,
    };
  } catch (err) {
    const msg = err.message.includes('Network request failed')
      ? `NETWORK ERROR: Backend not reachable at ${API_URL}`
      : err.message;
    console.error('Upload photo error:', msg);
    throw new Error(msg);
  }
};
