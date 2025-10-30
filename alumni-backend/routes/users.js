const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

// GET all users
router.get('/', verifyToken, getAllUsers);

// GET single user by ID
router.get('/:id', verifyToken, getUserById);

module.exports = router;
