const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Mongoose model

const JWT_SECRET = process.env.JWT_SECRET || 'somesecret';

// Helper function to standardize user object response
const getStandardUserResponse = (userDoc) => {
  const userObject = userDoc.toObject ? userDoc.toObject() : userDoc;
  
  // Clean up sensitive data before sending
  delete userObject.password; 
  delete userObject.__v; 

  // Structure the final object for the client (Ensures all fields are present)
  return {
    id: userObject._id,
    name: userObject.name,
    email: userObject.email,
    branch: userObject.branch || '',
    // Use graduationYear, fallback to legacy 'year'
    graduationYear: userObject.graduationYear || userObject.year || '', 
    company: userObject.company || '',
    photoUrl: userObject.photoUrl || '',
    role: userObject.role,
  };
};

// ====================== AUTH MIDDLEWARE ======================
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error('JWT verification error:', err.message);
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

// ====================== REGISTER ======================
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ success: false, message: 'Missing fields' });

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await User.findOne({ email: normalizedEmail });

    if (existing)
      return res.status(400).json({ success: false, message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password.trim(), 10);
    const user = new User({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
    });
    await user.save();

    return res.json({ success: true, message: 'User registered successfully' });
  } catch (err) {
    console.error('Register error:', err.message, err.stack); 
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ====================== LOGIN (CRASH & CONSISTENCY FIX) ======================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password are required' });

    const normalizedEmail = email.trim().toLowerCase();
    
    // 1. Fetch user, explicitly including the hidden password field.
    const user = await User.findOne({ email: normalizedEmail }).select('+password'); 

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    
    // 2. CRITICAL FIX: Ensure password hash exists before comparison.
    if (!user.password) {
      console.warn(`User ${user.email} found but has no password hash!`);
      return res.status(400).json({ success: false, message: 'Invalid credentials' }); 
    }

    // 3. Compare password.
    const isMatch = await bcrypt.compare(password.trim(), user.password); 
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // 4. Sign Token and prepare user response.
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    const userResponse = getStandardUserResponse(user);

    return res.json({
      success: true,
      token,
      user: userResponse,
    });
  } catch (err) {
    console.error('Login error (Final Check):', err.message, err.stack);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ====================== GET CURRENT USER (CONSISTENCY FIX) ======================
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // Fetch user without explicitly excluding password, then use helper to clean/structure it
    const user = await User.findById(req.user.id); 

    if (!user) return res.status(404).json({ success: false, message: 'User not found' });

    const userResponse = getStandardUserResponse(user);

    res.json({ success: true, user: userResponse });
  } catch (err) {
    console.error('Get current user error:', err.message, err.stack);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// ====================== UPDATE PROFILE ======================
router.put('/me', authMiddleware, async (req, res) => {
  try {
    const updates = req.body;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password.trim(), 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      updates,
      { new: true, runValidators: true }
    ); // Don't use .select('-password') here; the helper function will clean it.

    if (!updatedUser)
      return res.status(404).json({ success: false, message: 'User not found' });

    const userResponse = getStandardUserResponse(updatedUser);

    res.json({ success: true, user: userResponse });
  } catch (err) {
    console.error('Update profile error:', err.message, err.stack);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;