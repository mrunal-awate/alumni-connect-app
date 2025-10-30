const API_URL = 'http://192.168.0.100:5000/api'; 
// If you're using Android emulator use 10.0.2.2 to reach host machine.
// If testing on real device and backend on same LAN, use your PC's local IP like "http://192.168.1.5:5000/api".
// If using expo tunnel, you can use the tunnel URL or public host.

async function postJson(path, body) {
  const res = await fetch(`${API_URL}${path}`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify(body)
  });
  return res.json();
}

export const registerUser = (data) => postJson('/auth/register', data);
export const loginUser = (data) => postJson('/auth/login', data);
