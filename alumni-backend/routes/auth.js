// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User'); // Mongoose model

// const JWT_SECRET = process.env.JWT_SECRET || 'somesecret';          // Use environment variable in production

// // Helper function to standardize user object response
// const getStandardUserResponse = (userDoc) => {
//   const userObject = userDoc.toObject ? userDoc.toObject() : userDoc;
  
//   // Clean up sensitive data before sending
//   delete userObject.password; 
//   delete userObject.__v; 

//   // Structure the final object for the client (Ensures all fields are present)
//   return {
//     id: userObject._id,
//     name: userObject.name,
//     email: userObject.email,
//     branch: userObject.branch || '',
//     // Use graduationYear, fallback to legacy 'year'
//     graduationYear: userObject.graduationYear || userObject.year || '', 
//     company: userObject.company || '',
//     photoUrl: userObject.photoUrl || '',
//     role: userObject.role,
//   };
// };

// // ====================== AUTH MIDDLEWARE ======================
// const authMiddleware = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');
//   if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = { id: decoded.id };
//     next();
//   } catch (err) {
//     console.error('JWT verification error:', err.message);
//     return res.status(401).json({ success: false, message: 'Invalid token' });
//   }
// };

// // ====================== REGISTER ======================
// router.post('/register', async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password)
//       return res.status(400).json({ success: false, message: 'Missing fields' });

//     const normalizedEmail = email.trim().toLowerCase();
//     const existing = await User.findOne({ email: normalizedEmail });

//     if (existing)
//       return res.status(400).json({ success: false, message: 'Email already registered' });

//     const hashedPassword = await bcrypt.hash(password.trim(), 10);
//     const user = new User({
//       name: name.trim(),
//       email: normalizedEmail,
//       password: hashedPassword,
//     });
//     await user.save();

//     return res.json({ success: true, message: 'User registered successfully' });
//   } catch (err) {
//     console.error('Register error:', err.message, err.stack); 
//     return res.status(500).json({ success: false, message: 'Server error' });
//   }
// });

// // ====================== LOGIN (CRASH & CONSISTENCY FIX) ======================
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password)
//       return res.status(400).json({ success: false, message: 'Email and password are required' });

//     const normalizedEmail = email.trim().toLowerCase();
    
//     // 1. Fetch user, explicitly including the hidden password field.
//     const user = await User.findOne({ email: normalizedEmail }).select('+password'); 

//     if (!user) {
//       return res.status(400).json({ success: false, message: 'Invalid credentials' });
//     }
    
//     // 2. CRITICAL FIX: Ensure password hash exists before comparison.
//     if (!user.password) {
//       console.warn(`User ${user.email} found but has no password hash!`);
//       return res.status(400).json({ success: false, message: 'Invalid credentials' }); 
//     }

//     // 3. Compare password.
//     const isMatch = await bcrypt.compare(password.trim(), user.password); 
//     if (!isMatch) {
//       return res.status(400).json({ success: false, message: 'Invalid credentials' });
//     }

//     // 4. Sign Token and prepare user response.
//     const payload = { id: user._id, email: user.email };
//     const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

//     const userResponse = getStandardUserResponse(user);

//     return res.json({
//       success: true,
//       token,
//       user: userResponse,
//     });
//   } catch (err) {
//     console.error('Login error (Final Check):', err.message, err.stack);
//     return res.status(500).json({ success: false, message: 'Server error' });
//   }
// });

// // ====================== GET CURRENT USER (CONSISTENCY FIX) ======================
// router.get('/me', authMiddleware, async (req, res) => {
//   try {
//     // Fetch user without explicitly excluding password, then use helper to clean/structure it
//     const user = await User.findById(req.user.id); 

//     if (!user) return res.status(404).json({ success: false, message: 'User not found' });

//     const userResponse = getStandardUserResponse(user);

//     res.json({ success: true, user: userResponse });
//   } catch (err) {
//     console.error('Get current user error:', err.message, err.stack);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });

// // ====================== UPDATE PROFILE ======================
// router.put('/me', authMiddleware, async (req, res) => {
//   try {
//     const updates = req.body;

//     if (updates.password) {
//       updates.password = await bcrypt.hash(updates.password.trim(), 10);
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       req.user.id,
//       updates,
//       { new: true, runValidators: true }
//     ); // Don't use .select('-password') here; the helper function will clean it.

//     if (!updatedUser)
//       return res.status(404).json({ success: false, message: 'User not found' });

//     const userResponse = getStandardUserResponse(updatedUser);

//     res.json({ success: true, user: userResponse });
//   } catch (err) {
//     console.error('Update profile error:', err.message, err.stack);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// });

// module.exports = router;








// --------------------------------------------upper one is main ------ changes start from below here --------------------









const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

/* --------------------------- AUTH MIDDLEWARE --------------------------- */
const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ success: false, message: "No token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

/* ------------------------------- REGISTER ------------------------------- */
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role, college, branch, batch } = req.body;

    if (!name || !email || !password || !college || !branch || !batch)
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });

    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists)
      return res.status(400).json({ success: false, message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashed,
      role: role || "student",
      college,
      branch,
      batch,
      approved: role === "student" ? true : false, // alumni need approval
    });

    res.json({
      success: true,
      message:
        user.role === "alumni"
          ? "Registration successful. Waiting for admin approval."
          : "Registration successful",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Registration failed" });
  }
});

/* -------------------------------- LOGIN -------------------------------- */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ success: false, message: "Invalid credentials" });

    if (!user.approved)
      return res
        .status(403)
        .json({ success: false, message: "Your account is waiting for approval" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      success: true,
      token,
      user,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Login failed" });
  }
});

/* ------------------------------- CURRENT USER ------------------------------- */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, user });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch user" });
  }
});

/* ------------------------------ UPDATE PROFILE ------------------------------ */
router.put("/me", authMiddleware, async (req, res) => {
  try {
    const updates = req.body;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true });
    res.json({ success: true, user });
  } catch {
    res.status(500).json({ success: false, message: "Update failed" });
  }
});

module.exports = router;
