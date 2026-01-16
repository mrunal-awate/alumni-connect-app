// // screens/HomeScreen.js
// import React, { useContext } from 'react';
// import { View, Text, Button, StyleSheet, Alert } from 'react-native';
// import { AuthContext } from '../context/AuthContext';

// export default function HomeScreen({ navigation }) {
//   const { user, logout } = useContext(AuthContext);

//   const handleLogout = async () => {
//     try {
//       await logout();
//     } catch (err) {
//       console.log('Logout error:', err);
//       Alert.alert('Error', 'Failed to logout');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>
//         Welcome{user?.name ? `, ${user.name}` : ''}!
//       </Text>
//       <Text style={{ marginBottom: 20 }}>
//         This is the Home screen (you are logged in).
//       </Text>

//       <Button
//         title="Go to Profile"
//         onPress={() => navigation.navigate('Profile')}
//       />

//       <Button
//         title="View Alumni"
//         onPress={() => navigation.navigate('AlumniList')}
//       />

//       <View style={{ marginTop: 20 }}>
//         <Button title="Log out" onPress={handleLogout} color="red" />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
//   title: { fontSize: 20, marginBottom: 10, fontWeight: 'bold' },
// });










// ----------------------upper one is main ------ changes start from below here --------------------













import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function HomeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  // Temporary demo posts (backend feed will replace this)
  useEffect(() => {
    setPosts([
      {
        id: "1",
        author: "Rahul Patil",
        role: "Alumni - SITS Computer",
        content: "Hiring React Developer Interns at Infosys!",
      },
      {
        id: "2",
        author: "Sinhgad Admin",
        role: "Admin",
        content: "Campus placement drive this Friday 🚀",
      },
    ]);
  }, []);

  const renderPost = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.author}>{item.author}</Text>
      <Text style={styles.role}>{item.role}</Text>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.header}>
        <Text style={styles.logo}>Sinhgad Alumni</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image
            source={{ uri: user?.photoUrl || "https://i.pravatar.cc/100" }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>

      {/* Feed */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={{ padding: 15 }}
      />

      {/* Bottom Buttons */}
      <View style={styles.bottom}>
        <TouchableOpacity onPress={() => navigation.navigate("Alumni")}>
          <Text style={styles.link}>Find Alumni</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logout}>
          <Text style={[styles.link, { color: "red" }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ---------------- Styles ---------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fa" },

  header: {
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    elevation: 3,
  },

  logo: { fontSize: 18, fontWeight: "bold", color: "#2563eb" },

  avatar: { width: 35, height: 35, borderRadius: 20 },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
  },

  author: { fontWeight: "bold", fontSize: 16 },
  role: { color: "#555", fontSize: 12 },
  content: { marginTop: 10, fontSize: 14 },

  bottom: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  link: { fontWeight: "bold", color: "#2563eb" },
});
