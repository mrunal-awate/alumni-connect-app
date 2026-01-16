// // api/axiosClient.js
// import axios from 'axios';
// import { getToken } from '../utils/secureStore';

// // Replace with your backend IP + port
// const BASE_URL = 'http://192.168.0.105:5000';              // Update this to your backend server address (local IP for testing)

// const api = axios.create({
//   baseURL: BASE_URL,
//   timeout: 15000,
// });

// // Attach token automatically to every request
// api.interceptors.request.use(
//   async (config) => {
//     const token = await getToken('userToken');
//     if (token) config.headers.Authorization = `Bearer ${token}`;
//     return config;
//   },
//   (err) => Promise.reject(err)
// );

// export default api;














// ---------------------upper one is main ------ changes start from below here --------------------













// import axios from "axios";
// import { getToken } from "../utils/secureStore";
// import Constants from "expo-constants";

// // Use Expo env or fallback
// const BASE_URL =
//   Constants.expoConfig?.extra?.API_URL ||
//   "http://192.168.0.105:5000"; // default for emulator

// const api = axios.create({
//   baseURL: BASE_URL,
//   timeout: 20000,
// });

// /* ---------------- Attach JWT automatically ---------------- */
// api.interceptors.request.use(async (config) => {
//   const token = await getToken("userToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   config.headers["Content-Type"] = "application/json";
//   return config;
// });

// /* ---------------- Global error handler ---------------- */
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       console.log("API Error:", error.response.data);
//     } else {
//       console.log("Network Error:", error.message);
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;








// --------------------- upper one is main ------ changes start from below here --------------------







import axios from "axios";
import { getToken } from "../utils/secureStore";
import Constants from "expo-constants";

// Backend URL
const BASE_URL =
  Constants.expoConfig?.extra?.API_URL ||
  "https://unventable-mikaela-photolithographic.ngrok-free.dev";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 20000,
});

/* ---------------- Attach JWT automatically ---------------- */
api.interceptors.request.use(async (config) => {
  const token = await getToken("userToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // ⚠️ DO NOT force Content-Type
  // Axios sets it correctly for JSON and multipart uploads

  return config;
});

/* ---------------- Global error logger ---------------- */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log("API Error:", error.response.data);
    } else {
      console.log("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
