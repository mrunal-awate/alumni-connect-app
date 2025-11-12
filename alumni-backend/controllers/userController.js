
// // controllers/userController.js
// const User = require('../models/User');
// const path = require('path');

// // Fields to select for all public user views (list, profile)
// const USER_FIELDS = 'name email branch year graduationYear company photoUrl role approved';

// // ✅ Get all users (FIXED: Filter removed to show all alumni)
// exports.getAllUsers = async (req, res) => {
//  try {
//   // FIX: Changed { approved: true } to {} to show ALL users
//   const users = await User.find({}, USER_FIELDS); 
//   res.json({ users }); } catch (err) {  console.error('Error fetching users:', err);
//   res.status(500).json({ message: 'Error fetching users', error: err.message });
//  }
// };

// // ✅ Get single user by ID
// exports.getUserById = async (req, res) => {
//  try {
//   const user = await User.findById(req.params.id).select(USER_FIELDS);
//   if (!user) return res.status(404).json({ message: 'User not found' });
//   res.json({ user });
//  } catch (err) {
//   console.error('Error fetching user:', err);
//   res.status(500).json({ message: 'Error fetching user', error: err.message });
//  }
// };

// // ✅ Update user's profile info
// exports.updateUserProfile = async (req, res) => {
//  try {
//   const userId = req.user.id; // decoded from verifyToken
//   const { name, branch, year, graduationYear, company } = req.body;
//   const updateData = { name, branch, year, graduationYear, company };
//   if (req.file) {
//    updateData.photoUrl = `/uploads/${req.file.filename}`;
//   }

//   const updatedUser = await User.findByIdAndUpdate(
//    userId,
//    updateData,
//    { new: true, runValidators: true }
//   ).select(USER_FIELDS);

//   if (!updatedUser)
//    return res.status(404).json({ message: 'User not found' });

//   res.json({ success: true, user: updatedUser });
//  } catch (err) {   console.error('Error updating profile:', err);
//   res.status(500).json({ message: 'Error updating profile', error: err.message });
//  }
// };

// // ✅ Upload user profile photo separately
// exports.uploadProfilePhoto = async (req, res) => {
//  try {
//   if (!req.file) {
//    return res.status(400).json({ message: 'No photo uploaded' });
//   }

//   const userId = req.user.id;
//   const imageUrl = `/uploads/${req.file.filename}`;

//   const updatedUser = await User.findByIdAndUpdate(
//    userId,
//    { photoUrl: imageUrl },
//    { new: true }
//   ).select(USER_FIELDS);

//   if (!updatedUser) {   return res.status(404).json({ message: 'User not found' });
//   }

//   res.json({
//    success: true,   message: 'Profile photo uploaded successfully!',
//    photoUrl: imageUrl,
//    user: updatedUser,
//   });
//  } catch (err) {
//   console.error('Error uploading photo:', err);
//   res.status(500).json({ message: 'Error uploading photo', error: err.message });
//  }
// };

// controllers/userController.js
const User = require('../models/User');
const path = require('path');

const USER_FIELDS = 'name email branch year graduationYear company photoUrl role approved';

// ✅ Get all users (alumni directory)
exports.getAllUsers = async (req, res) => {
  try {
    // You can later add filters like { role: 'alumni', approved: true }
    const users = await User.find({}, USER_FIELDS).lean();

    if (!users || users.length === 0) {
      return res.json({ users: [] });
    }

    res.json({ users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

// ✅ Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(USER_FIELDS);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};

// ✅ Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, branch, year, graduationYear, company } = req.body;
    const updateData = { name, branch, year, graduationYear, company };

    if (req.file) {
      updateData.photoUrl = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    }).select(USER_FIELDS);

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Error updating profile', error: err.message });
  }
};

// ✅ Upload profile photo
exports.uploadProfilePhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No photo uploaded' });

    const userId = req.user.id;
    const imageUrl = `/uploads/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(userId, { photoUrl: imageUrl }, { new: true }).select(USER_FIELDS);

    if (!updatedUser) return res.status(404).json({ message: 'User not found' });

    res.json({
      success: true,
      message: 'Profile photo uploaded successfully!',
      photoUrl: imageUrl,
      user: updatedUser,
    });
  } catch (err) {
    console.error('Error uploading photo:', err);
    res.status(500).json({ message: 'Error uploading photo', error: err.message });
  }
};
