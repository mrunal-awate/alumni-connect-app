
// const API_URL = 'http://192.168.0.103:5000/api'; // make sure this matches your backend

// async function getJson(path, token) {
//   const res = await fetch(`${API_URL}${path}`, {
//     headers: { 
//       'Content-Type': 'application/json',
//       ...(token ? { Authorization: `Bearer ${token}` } : {})
//     },
//   });

//   const text = await res.text(); // get raw response
//   try {
//     return JSON.parse(text);
//   } catch (err) {
//     console.log('Response not JSON:', text);
//     throw err;
//   }
// }

// export const getAllUsers = (token) => getJson('/users', token);

// export const registerUser = (data) => 
//   fetch(`${API_URL}/auth/register`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   }).then(res => res.json());

// export const loginUser = (data) => 
//   fetch(`${API_URL}/auth/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(data),
//   }).then(res => res.json());



const API_URL = 'http://192.168.0.101:5000/api'; // make sure this matches your backend

// Generic GET request
async function getJson(path, token) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
  });

  const text = await res.text(); // get raw response
  try {
    return JSON.parse(text);
  } catch (err) {
    console.log('Response not JSON:', text);
    throw err;
  }
}

// Auth APIs
export const registerUser = (data) => 
  fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());

export const loginUser = (data) => 
  fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json());

// Alumni APIs
export const getAllUsers = (token) => getJson('/users', token);

// Fetch a single alumni by ID
export const getUserById = (id, token) => getJson(`/users/${id}`, token);
