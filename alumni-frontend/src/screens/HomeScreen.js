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













// import React, { useContext, useEffect, useState } from "react";
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";          // Import Image component
// import { AuthContext } from "../context/AuthContext";

// export default function HomeScreen({ navigation }) {                    // Home screen showing feed and navigation
//   const { user, logout } = useContext(AuthContext);                     // Get user info and logout function from context
//   const [posts, setPosts] = useState([]);

//   // Temporary demo posts (backend feed will replace this)
//   useEffect(() => {
//     setPosts([
//       {
//         id: "1",
//         author: "Rahul Patil",
//         role: "Alumni - SITS Computer",
//         content: "Hiring React Developer Interns at Infosys!",
//       },
//       {
//         id: "2",
//         author: "Sinhgad Admin",
//         role: "Admin",
//         content: "Campus placement drive this Friday 🚀",
//       },
//     ]);
//   }, []);

//   const renderPost = ({ item }) => (                                    // Render each post in the feed
//     <View style={styles.card}>
//       <Text style={styles.author}>{item.author}</Text>
//       <Text style={styles.role}>{item.role}</Text>
//       <Text style={styles.content}>{item.content}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* Top Bar */}
//       <View style={styles.header}>
//         <Text style={styles.logo}>Sinhgad Alumni Post's</Text>
//         <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
//           <Image
//             source={{ uri: user?.photoUrl || "https://i.pravatar.cc/100" }}
//             style={styles.avatar}
//           />
//         </TouchableOpacity>
//       </View>

//       {/* Feed */}
//       <FlatList
//         data={posts}
//         keyExtractor={(item) => item.id}
//         renderItem={renderPost}
//         contentContainerStyle={{ padding: 15 }}
//       />

//       {/* Bottom Buttons */}
//       <View style={styles.bottom}>
//         <TouchableOpacity onPress={() => navigation.navigate("Alumni")}>
//           <Text style={styles.link}>Find Alumni</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={logout}>
//           <Text style={[styles.link, { color: "red" }]}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// /* ---------------- Styles ---------------- */
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f5f7fa" },

//   header: {
//     height: 60,
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 15,
//     elevation: 3,
//   },

//   logo: { fontSize: 18, fontWeight: "bold", color: "#2563eb" },

//   avatar: { width: 35, height: 35, borderRadius: 20 },

//   card: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 15,
//     elevation: 2,
//   },

//   author: { fontWeight: "bold", fontSize: 16 },
//   role: { color: "#555", fontSize: 12 },
//   content: { marginTop: 10, fontSize: 14 },

//   bottom: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     padding: 10,
//     backgroundColor: "#fff",
//     borderTopWidth: 1,
//     borderColor: "#eee",
//   },

//   link: { fontWeight: "bold", color: "#2563eb" },
// });













// ----------------------------- upper one is main ------ changes start from below here --------------------










// import React, { useContext, useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import { AuthContext } from "../context/AuthContext";

// export default function HomeScreen({ navigation }) {
//   const { user, logout } = useContext(AuthContext);
//   const [posts, setPosts] = useState([]);

//   /* -------------------- Demo Feed -------------------- */
//   useEffect(() => {
//     setPosts([
//       {
//         id: "1",
//         author: "Mrunal Awate",
//         role: "Official Admin",
//         avatar: "http://192.168.0.102:5000/uploads/1763094514918.jpg",
//         content:
//           "📢 Campus placement drive scheduled this Friday.\n\nEligible branches:\n• Computer\n• IT\n• ENTC\n\nAll the best!",
//         time: "1h",
//       },
//       {
//         id: "2",
//         author: "Tanaya Bhore",
//         role: "Alumni • SITS • Computer",
//         avatar: "https://i.pravatar.cc/150?img=32",
//         content:
//           "🚀 Hiring React Developer Interns at Infosys!\n\nSkills required:\n• React\n• JavaScript\n• APIs\n\nDM me if interested.",
//         time: "2h",
//       },
//       {
//         id: "3",
//         author: "Gayatri Belsare",
//         role: "Developer",
//         avatar: "https://i.pravatar.cc/150?img=32",
//         content:
//           "🚀 Looking for Full-Stack App Developers!\n\nSkills required:\n• React / Next.js\n• Node.js / Express\n• MongoDB / SQL\n\nDM me if interested.",
//         time: "15h",
//       },
//       {
//         id: "4",
//         author: "Karan Bhavsar",
//         role: "Developer",
//         avatar: "https://i.pravatar.cc/150?img=32",
//         content:
//           "📱 Hiring Mobile App Developer Interns!\n\nSkills required:\n• Android / iOS\n• React Native or Flutter\n• REST APIs\n\nDM me if interested.",
//         time: "2h",
//       },
//     ]);
//   }, []);

//   /* -------------------- Render Post -------------------- */
//   const renderPost = ({ item }) => (
//     <View style={styles.card}>
//       {/* Header */}
//       <View style={styles.postHeader}>
//         <Image source={{ uri: item.avatar }} style={styles.postAvatar} />
//         <View style={{ flex: 1 }}>
//           <Text style={styles.author}>{item.author}</Text>
//           <Text style={styles.meta}>
//             {item.role} • {item.time}
//           </Text>
//         </View>
//       </View>

//       {/* Content */}
//       <Text style={styles.content}>{item.content}</Text>

//       {/* Actions */}
//       <View style={styles.actions}>
//         <TouchableOpacity>
//           <Text style={styles.actionText}>👍 Like</Text>
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Text style={styles.actionText}>💬 Comment</Text>
//         </TouchableOpacity>
//         <TouchableOpacity>
//           <Text style={styles.actionText}>↗ Share</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   /* -------------------- Resolve avatar -------------------- */
//   const profileAvatar =
//     user?.photoUrl?.startsWith("http")
//       ? user.photoUrl
//       : user?.photoUrl
//       ? `http://192.168.0.102:5000${user.photoUrl}`
//       : "https://i.pravatar.cc/100";

//   return (
//     <View style={styles.container}>
//       {/* ---------------- Header ---------------- */}
//       <View style={styles.header}>
//         <Text style={styles.logo}>Sinhgad Alumni</Text>
//         <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
//           <Image source={{ uri: profileAvatar }} style={styles.avatar} />
//         </TouchableOpacity>
//       </View>

//       {/* ---------------- Feed ---------------- */}
//       <FlatList
//         data={posts}
//         keyExtractor={(item) => item.id}
//         renderItem={renderPost}
//         contentContainerStyle={{ padding: 15 }}
//         showsVerticalScrollIndicator={false}
//       />

//       {/* ---------------- Bottom Bar ---------------- */}
//       <View style={styles.bottom}>
//         <TouchableOpacity onPress={() => navigation.navigate("Alumni")}>
//           <Text style={styles.link}>Find Alumni</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={logout}>
//           <Text style={[styles.link, { color: "red" }]}>Logout</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// /* -------------------- Styles -------------------- */
// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#f0f2f5" },

//   header: {
//     height: 60,
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 15,
//     elevation: 4,
//   },

//   logo: { fontSize: 18, fontWeight: "bold", color: "#2563eb" },
//   avatar: { width: 36, height: 36, borderRadius: 18 },

//   card: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 12,
//     marginBottom: 15,
//     elevation: 2,
//   },

//   postHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },

//   postAvatar: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     marginRight: 10,
//   },

//   author: { fontSize: 16, fontWeight: "bold", color: "#111" },
//   meta: { fontSize: 12, color: "#666", marginTop: 2 },

//   content: {
//     fontSize: 14,
//     color: "#333",
//     lineHeight: 20,
//     marginBottom: 12,
//   },

//   actions: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     borderTopWidth: 1,
//     borderColor: "#eee",
//     paddingTop: 10,
//   },

//   actionText: {
//     fontSize: 14,
//     color: "#2563eb",
//     fontWeight: "600",
//   },

//   bottom: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     padding: 12,
//     backgroundColor: "#fff",
//     borderTopWidth: 1,
//     borderColor: "#eee",
//   },

//   link: { fontWeight: "bold", color: "#2563eb" },
// });












// ------------------------------ upper one is main ------ changes start from below here --------------------






// 12343





import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { AuthContext } from "../context/AuthContext";

const BASE_URL = "http://192.168.0.102:5000"; // keep same as backend

export default function HomeScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  /* -------------------- Demo Feed -------------------- */
  useEffect(() => {
    setPosts([
      {
        id: "1",
        author: "Mrunal Awate",
        role: "Official Admin",
        avatar: "/uploads/1763094514918.jpg",
        content:
          "📢 Campus placement drive scheduled this Friday.\n\nEligible branches:\n• Computer\n• IT\n• ENTC\n\nAll the best!",
        time: "1h",
      },
      {
        id: "2",
        author: "Tanaya Bhore",
        role: "Alumni • SITS • Computer",
        avatar: "https://i.pravatar.cc/150?img=32",
        content:
          "🚀 Hiring React Developer Interns at Infosys!\n\nSkills required:\n• React\n• JavaScript\n• APIs\n\nDM me if interested.",
        time: "2h",
      },
      {
        id: "3",
        author: "Gayatri Belsare",
        role: "Developer",
        avatar: "https://i.pravatar.cc/150?img=32",
        content:
          "🚀 Looking for Full-Stack App Developers!\n\nSkills required:\n• React / Next.js\n• Node.js / Express\n• MongoDB / SQL\n\nDM me if interested.",
        time: "15h",
      },
      {
        id: "4",
        author: "Karan Bhavsar",
        role: "Developer",
        avatar: "https://i.pravatar.cc/150?img=32",
        content:
          "📱 Hiring Mobile App Developer Interns!\n\nSkills required:\n• Android / iOS\n• React Native or Flutter\n• REST APIs\n\nDM me if interested.",
        time: "2h",
      },
    ]);
  }, []);

  /* -------------------- Resolve avatar -------------------- */
  const profileAvatar =
    user?.photoUrl?.startsWith("http")
      ? user.photoUrl
      : user?.photoUrl
      ? `http://192.168.0.102:5000${user.photoUrl}`
      : "https://i.pravatar.cc/100";

  /* -------------------- Render Post -------------------- */
  const renderPost = ({ item }) => {
    const postAvatar = item.avatar.startsWith("http")
      ? item.avatar
      : `${BASE_URL}${item.avatar}`;

    return (
      <View style={styles.card}>
        <View style={styles.postHeader}>
          <Image source={{ uri: postAvatar }} style={styles.postAvatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.author}>{item.author}</Text>
            <Text style={styles.meta}>
              {item.role} • {item.time}
            </Text>
          </View>
        </View>

        <Text style={styles.content}>{item.content}</Text>

        <View style={styles.actions}>
          <TouchableOpacity>
            <Text style={styles.actionText}>👍 Like</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.actionText}>💬 Comment</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.actionText}>↗ Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* ---------------- Header ---------------- */}
      <View style={styles.header}>
        <Text style={styles.logo}>Sinhgad Alumni</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Image source={{ uri: profileAvatar }} style={styles.avatar} />
        </TouchableOpacity>
      </View>

      {/* ---------------- Create Post ---------------- */}
      <TouchableOpacity style={styles.createPost}>
        <Image source={{ uri: profileAvatar }} style={styles.createAvatar} />
        <Text style={styles.createText}>Start a post</Text>
      </TouchableOpacity>

      {/* ---------------- Feed ---------------- */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={{ padding: 15 }}
        showsVerticalScrollIndicator={false}
      />
  
      {/* ---------------- Bottom Bar ---------------- */}
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

/* -------------------- Styles -------------------- */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f5" },

  header: {
    height: 60,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    elevation: 4,
  },

  logo: { fontSize: 22, fontWeight: "bold", color: "#2563eb" },
  avatar: { width: 36, height: 36, borderRadius: 18 },

  createPost: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 12,
    padding: 12,
    borderRadius: 30,
    elevation: 2,
  },

  createAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },

  createText: {
    color: "#666",
    fontSize: 14,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  postAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 10,
  },

  author: { fontSize: 16, fontWeight: "bold", color: "#111" },
  meta: { fontSize: 12, color: "#666", marginTop: 2 },

  content: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
    marginBottom: 12,
  },

  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 10,
  },

  actionText: {
    fontSize: 14,
    color: "#2563eb",
    fontWeight: "600",
  },

  bottom: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  link: { fontWeight: "bold", color: "#2563eb" },
});








// --------------------------------- upper one is main ------ changes start from below here --------------------









// import React, { useContext, useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { AuthContext } from "../context/AuthContext";

// const BASE_URL = "http://192.168.0.102:5000";

// export default function HomeScreen({ navigation }) {
//   const { user } = useContext(AuthContext);
//   const [posts, setPosts] = useState([]);

//   /* -------------------- Demo Feed -------------------- */
//   useEffect(() => {
//     setPosts([
//       {
//         id: "1",
//         author: "Mrunal Awate",
//         role: "Official Admin",
//         avatar: "/uploads/1763094514918.jpg",
//         content:
//           "📢 Campus placement drive scheduled this Friday.\n\nEligible branches:\n• Computer\n• IT\n• ENTC\n\nAll the best!",
//         time: "1h",
//       },
//       {
//         id: "2",
//         author: "Tanaya Bhore",
//         role: "Alumni • SITS • Computer",
//         avatar: "https://i.pravatar.cc/150?img=32",
//         content:
//           "🚀 Hiring React Developer Interns at Infosys!\n\nSkills required:\n• React\n• JavaScript\n• APIs\n\nDM me if interested.",
//         time: "2h",
//       },
//     ]);
//   }, []);

//   /* -------------------- Resolve logged-in user avatar -------------------- */
//   const profileAvatar =
//     user?.photoUrl?.startsWith("http")
//       ? user.photoUrl
//       : user?.photoUrl
//       ? `${BASE_URL}${user.photoUrl}`
//       : "https://i.pravatar.cc/100";

//   /* -------------------- Render Post -------------------- */
//   const renderPost = ({ item }) => {
//     const postAvatar = item.avatar.startsWith("http")
//       ? item.avatar
//       : `${BASE_URL}${item.avatar}`;

//     return (
//       <View style={styles.card}>
//         {/* Header */}
//         <View style={styles.postHeader}>
//           <Image source={{ uri: postAvatar }} style={styles.postAvatar} />
//           <View style={{ flex: 1 }}>
//             <Text style={styles.author}>{item.author}</Text>
//             <Text style={styles.meta}>
//               {item.role} • {item.time}
//             </Text>
//           </View>
//         </View>

//         {/* Content */}
//         <Text style={styles.content}>{item.content}</Text>

//         {/* Actions */}
//         <View style={styles.actions}>
//           <TouchableOpacity style={styles.actionBtn}>
//             <Ionicons name="thumbs-up-outline" size={18} color="#555" />
//             <Text style={styles.actionText}>Like</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionBtn}>
//             <Ionicons name="chatbubble-outline" size={18} color="#555" />
//             <Text style={styles.actionText}>Comment</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.actionBtn}>
//             <Ionicons name="share-social-outline" size={18} color="#555" />
//             <Text style={styles.actionText}>Share</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     );
//   };

//   /* -------------------- List Header (Top UI) -------------------- */
//   const ListHeader = () => (
//     <>
//       {/* App Header */}
//       <View style={styles.header}>
//         <Text style={styles.logo}>Sinhgad Alumni</Text>
//         <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
//           <Image source={{ uri: profileAvatar }} style={styles.avatar} />
//         </TouchableOpacity>
//       </View>

//       {/* Create Post */}
//       <TouchableOpacity
//         style={styles.createPost}
//         activeOpacity={0.8}
//         onPress={() => {
//           // next phase: CreatePost screen
//         }}
//       >
//         <Image source={{ uri: profileAvatar }} style={styles.createAvatar} />
//         <Text style={styles.createText}>Start a post</Text>
//       </TouchableOpacity>
//     </>
//   );

//   return (
//     <FlatList
//       data={posts}
//       keyExtractor={(item) => item.id}
//       renderItem={renderPost}
//       ListHeaderComponent={ListHeader}
//       contentContainerStyle={{ padding: 15 }}
//       showsVerticalScrollIndicator={false}
//       keyboardShouldPersistTaps="handled"
//       style={{ backgroundColor: "#f0f2f5" }}
//     />
//   );
// }

// /* -------------------- Styles -------------------- */
// const styles = StyleSheet.create({
//   header: {
//     height: 60,
//     backgroundColor: "#fff",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 15,
//     marginBottom: 10,
//     elevation: 3,
//   },

//   logo: { fontSize: 18, fontWeight: "bold", color: "#2563eb" },
//   avatar: { width: 36, height: 36, borderRadius: 18 },

//   createPost: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#fff",
//     padding: 12,
//     borderRadius: 30,
//     elevation: 2,
//     marginBottom: 15,
//   },

//   createAvatar: {
//     width: 36,
//     height: 36,
//     borderRadius: 18,
//     marginRight: 10,
//   },

//   createText: {
//     color: "#666",
//     fontSize: 14,
//   },

//   card: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 12,
//     marginBottom: 15,
//     elevation: 2,
//   },

//   postHeader: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },

//   postAvatar: {
//     width: 44,
//     height: 44,
//     borderRadius: 22,
//     marginRight: 10,
//   },

//   author: { fontSize: 16, fontWeight: "bold", color: "#111" },
//   meta: { fontSize: 12, color: "#666", marginTop: 2 },

//   content: {
//     fontSize: 14,
//     color: "#333",
//     lineHeight: 20,
//     marginBottom: 12,
//   },

//   actions: {
//     flexDirection: "row",
//     justifyContent: "space-around",
//     borderTopWidth: 1,
//     borderColor: "#eee",
//     paddingTop: 10,
//   },

//   actionBtn: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 6,
//   },

//   actionText: {
//     fontSize: 13,
//     color: "#555",
//     fontWeight: "600",
//   },
// });
