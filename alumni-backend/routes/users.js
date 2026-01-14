// const express = require('express');
// const router = express.Router();
// const multer = require('multer');
// const path = require('path');
// const {
//   getAllUsers,
//   getUserById,
//   updateUserProfile,
//   uploadProfilePhoto
// } = require('../controllers/userController');
// const { verifyToken } = require('../middleware/authMiddleware');

// // ✅ Multer setup for image uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../uploads'));
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // unique filename
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
//   fileFilter: (req, file, cb) => {
//     const allowed = /jpeg|jpg|png/;
//     const ext = allowed.test(path.extname(file.originalname).toLowerCase());
//     const mime = allowed.test(file.mimetype);
//     if (ext && mime) cb(null, true);
//     else cb(new Error('Only JPEG, JPG, or PNG images are allowed!'));
//   },
// });

// // ✅ GET all users
// router.get('/', verifyToken, getAllUsers);

// // ✅ GET single user by ID
// router.get('/:id', verifyToken, getUserById);

// // ✅ PUT - Update logged-in user's profile (can include photo)
// router.put('/update', verifyToken, upload.single('photo'), updateUserProfile);

// // ✅ POST - Upload only profile photo (standalone)
// router.post('/upload-photo', verifyToken, upload.single('photo'), uploadProfilePhoto);

// module.exports = router;



// routes/user.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
  getAllUsers,
  getUserById,
  updateUserProfile,
  uploadProfilePhoto,
} = require('../controllers/userController');                           // Import controller functions
const { verifyToken } = require('../middleware/authMiddleware');          // Auth middleware

/* -------------------------------------------------------------------------- */
/*                        🧩 Ensure uploads directory exists                   */
/* -------------------------------------------------------------------------- */
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/* -------------------------------------------------------------------------- */
/*                        🖼️ Multer configuration setup                        */
/* -------------------------------------------------------------------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error('Only JPEG, JPG, or PNG images are allowed!'));
  },
});

/* -------------------------------------------------------------------------- */
/*                     ⚙️ Multer Error Handling Middleware                     */
/* -------------------------------------------------------------------------- */
function handleMulterErrors(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    // Handle known Multer errors
    return res.status(400).json({ success: false, message: `Multer error: ${err.message}` });
  } else if (err) {
    // Handle unexpected upload errors
    return res.status(400).json({ success: false, message: err.message || 'File upload failed' });
  }
  next();
}

/* -------------------------------------------------------------------------- */
/*                                 🧠 ROUTES                                   */
/* -------------------------------------------------------------------------- */

// ✅ GET all users (Alumni directory)
router.get('/', verifyToken, getAllUsers);

// ✅ GET single user by ID
router.get('/:id', verifyToken, getUserById);

// ✅ PUT - Update logged-in user's profile (can include photo)
router.put(
  '/update',
  verifyToken,
  upload.single('photo'),
  handleMulterErrors,
  updateUserProfile
);

// ✅ POST - Upload only profile photo (standalone)
router.post(
  '/upload-photo',
  verifyToken,
  upload.single('photo'),
  handleMulterErrors,
  uploadProfilePhoto
);

module.exports = router;
