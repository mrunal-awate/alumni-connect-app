// const User = require('../models/User');

// exports.getUserbyId = async (req, res) => {
//   try {
//     const users = await User.find().select('-password'); // exclude passwords
//     res.json({ users });  // match what frontend expects
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// const User = require('../models/User');

// exports.getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select('-password'); // exclude password
//     if (!user) {
//       return res.status(404).json({ success: false, message: 'User not found' });
//     }
//     res.json({ success: true, user });
//   } catch (err) {
//     console.error('Error fetching user by ID:', err);
//     res.status(500).json({ success: false, message: 'Server error' });
//   }
// };



const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
};
