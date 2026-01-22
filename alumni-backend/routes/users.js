// // const express = require('express');
// // const router = express.Router();
// // const multer = require('multer');
// // const path = require('path');
// // const {
// //   getAllUsers,
// //   getUserById,
// //   updateUserProfile,
// //   uploadProfilePhoto
// // } = require('../controllers/userController');
// // const { verifyToken } = require('../middleware/authMiddleware');

// // // ✅ Multer setup for image uploads
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, path.join(__dirname, '../uploads'));
// //   },
// //   filename: (req, file, cb) => {
// //     cb(null, Date.now() + path.extname(file.originalname)); // unique filename
// //   },
// // });

// // const upload = multer({
// //   storage,
// //   limits: { fileSize: 5 * 1024 * 1024 }, // max 5MB
// //   fileFilter: (req, file, cb) => {
// //     const allowed = /jpeg|jpg|png/;
// //     const ext = allowed.test(path.extname(file.originalname).toLowerCase());
// //     const mime = allowed.test(file.mimetype);
// //     if (ext && mime) cb(null, true);
// //     else cb(new Error('Only JPEG, JPG, or PNG images are allowed!'));
// //   },
// // });

// // // ✅ GET all users
// // router.get('/', verifyToken, getAllUsers);

// // // ✅ GET single user by ID
// // router.get('/:id', verifyToken, getUserById);

// // // ✅ PUT - Update logged-in user's profile (can include photo)
// // router.put('/update', verifyToken, upload.single('photo'), updateUserProfile);

// // // ✅ POST - Upload only profile photo (standalone)
// // router.post('/upload-photo', verifyToken, upload.single('photo'), uploadProfilePhoto);

// // module.exports = router;














// // ---------------------------------------------------------------------------


















// // // routes/user.js
// // const express = require('express');
// // const router = express.Router();
// // const multer = require('multer');
// // const path = require('path');
// // const fs = require('fs');
// // const {
// //   getAllUsers,
// //   getUserById,
// //   updateUserProfile,
// //   uploadProfilePhoto,
// // } = require('../controllers/userController');                           // Import controller functions
// // const { verifyToken } = require('../middleware/authMiddleware');          // Auth middleware

// // /* -------------------------------------------------------------------------- */
// // /*                        🧩 Ensure uploads directory exists                   */
// // /* -------------------------------------------------------------------------- */
// // const uploadsDir = path.join(__dirname, '../uploads');       
// // if (!fs.existsSync(uploadsDir)) {
// //   fs.mkdirSync(uploadsDir, { recursive: true });
// // }

// // /* -------------------------------------------------------------------------- */
// // /*                        🖼️ Multer configuration setup                        */
// // /* -------------------------------------------------------------------------- */
// // const storage = multer.diskStorage({
// //   destination: (req, file, cb) => {
// //     cb(null, uploadsDir);
// //   },
// //   filename: (req, file, cb) => {
// //     const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;           // unique filename
// //     cb(null, uniqueName);
// //   },
// // });

// // const upload = multer({
// //   storage,
// //   limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
// //   fileFilter: (req, file, cb) => {
// //     const allowed = /jpeg|jpg|png/;
// //     const ext = allowed.test(path.extname(file.originalname).toLowerCase());
// //     const mime = allowed.test(file.mimetype);
// //     if (ext && mime) cb(null, true);
// //     else cb(new Error('Only JPEG, JPG, or PNG images are allowed!'));
// //   },
// // });

// // /* -------------------------------------------------------------------------- */
// // /*                     ⚙️ Multer Error Handling Middleware                     */
// // /* -------------------------------------------------------------------------- */
// // function handleMulterErrors(err, req, res, next) {
// //   if (err instanceof multer.MulterError) {
// //     // Handle known Multer errors
// //     return res.status(400).json({ success: false, message: `Multer error: ${err.message}` });
// //   } else if (err) {
// //     // Handle unexpected upload errors
// //     return res.status(400).json({ success: false, message: err.message || 'File upload failed' });
// //   }
// //   next();
// // }

// // /* -------------------------------------------------------------------------- */
// // /*                                 🧠 ROUTES                                   */
// // /* -------------------------------------------------------------------------- */

// // // ✅ GET all users (Alumni directory)
// // router.get('/', verifyToken, getAllUsers);

// // // ✅ GET single user by ID
// // router.get('/:id', verifyToken, getUserById);

// // // ✅ PUT - Update logged-in user's profile (can include photo)
// // router.put(
// //   '/update',
// //   verifyToken,
// //   upload.single('photo'),
// //   handleMulterErrors,
// //   updateUserProfile
// // );

// // // ✅ POST - Upload only profile photo (standalone)
// // router.post(
// //   '/upload-photo',
// //   verifyToken,
// //   upload.single('photo'),
// //   handleMulterErrors,
// //   uploadProfilePhoto
// // );

// // module.exports = router;











// // ----------------------------upper one is main ------ changes start from below here --------------------










// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const User = require("../models/User");
// const { verifyToken } = require("../middleware/authMiddleware");

// /* ----------------------- Ensure uploads directory ----------------------- */
// const uploadsDir = path.join(__dirname, "../uploads");
// if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

// /* ----------------------------- Multer Setup ----------------------------- */
// const storage = multer.diskStorage({
//   destination: uploadsDir,
//   filename: (req, file, cb) => {
//     const name = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, name + path.extname(file.originalname));
//   },
// });

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 },
//   fileFilter: (req, file, cb) => {
//     const allowed = ["image/jpeg", "image/png", "image/jpg"];
//     if (!allowed.includes(file.mimetype)) {
//       cb(new Error("Only JPG, JPEG, PNG allowed"));
//     } else cb(null, true);
//   },
// });

// /* ------------------------------ Get Users ------------------------------ */
// /*  Filter by college, branch, batch */
// router.get("/", verifyToken, async (req, res) => {
//   try {
//     const { college, branch, batch } = req.query;

//     let filter = { approved: true };

//     if (college) filter.college = college;
//     if (branch) filter.branch = branch;
//     if (batch) filter.batch = batch;

//     const users = await User.find(filter).sort({ createdAt: -1 });
//     res.json({ success: true, users });
//   } catch {
//     res.status(500).json({ success: false, message: "Failed to fetch users" });
//   }
// });

// /* --------------------------- Get Profile --------------------------- */
// router.get("/:id", verifyToken, async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     res.json({ success: true, user });
//   } catch {
//     res.status(404).json({ success: false, message: "User not found" });
//   }
// });

// /* --------------------------- Update Profile --------------------------- */
// router.put("/update", verifyToken, upload.single("photo"), async (req, res) => {
//   try {
//     const updates = req.body;
//     if (req.file) updates.photoUrl = `/uploads/${req.file.filename}`;

//     const user = await User.findByIdAndUpdate(req.userId, updates, { new: true });
//     res.json({ success: true, user });
//   } catch {
//     res.status(500).json({ success: false, message: "Update failed" });
//   }
// });

// /* ----------------------- Admin Approval ----------------------- */
// router.put("/approve/:id", verifyToken, async (req, res) => {
//   try {
//     const admin = await User.findById(req.userId);
//     if (admin.role !== "admin")
//       return res.status(403).json({ success: false, message: "Admin only" });

//     const user = await User.findByIdAndUpdate(
//       req.params.id,
//       { approved: true },
//       { new: true }
//     );

//     res.json({ success: true, user });
//   } catch {
//     res.status(500).json({ success: false, message: "Approval failed" });
//   }
// });

// module.exports = router;









// ------------------------------------upper one is main ------ changes start from below here --------------------








const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const User = require("../models/User");
const { verifyToken } = require("../middleware/authMiddleware");

/* ----------------------- Ensure uploads directory ----------------------- */
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

/* ----------------------------- Multer Setup ----------------------------- */
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const name = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, name + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowed.includes(file.mimetype)) {
      cb(new Error("Only JPG, JPEG, PNG allowed"));
    } else {
      cb(null, true);
    }
  },
});

/* ------------------------------ Get Users ------------------------------ */
/* Filter by college, branch, batch */
router.get("/", verifyToken, async (req, res) => {
  try {
    const { college, branch, batch } = req.query;

    const filter = { approved: true };

    if (college) filter.college = college;
    if (branch) filter.branch = branch;
    if (batch) filter.batch = batch;

    const users = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 });

    res.json({ success: true, users });
  } catch (err) {
    console.error("Fetch users error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
    });
  }
});

/* --------------------------- Get Profile --------------------------- */
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error("Get profile error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to load profile",
    });
  }
});

/* --------------------------- Update Profile (TEXT ONLY) --------------------------- */
router.put("/update", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const updates = {
      name: req.body.name,
      company: req.body.company,
      city: req.body.city,
      bio: req.body.bio,
    };

    const user = await User.findByIdAndUpdate(
      userId,
      updates,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({ success: true, user });
  } catch (err) {
    console.error("Update profile error:", err.message);
    res.status(500).json({
      success: false,
      message: "Update failed",
    });
  }
});

/* --------------------------- Upload Profile Photo --------------------------- */
router.put(
  "/upload-photo",
  verifyToken,
  upload.single("photo"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const userId = req.user.id;
      const photoUrl = `/uploads/${req.file.filename}`;

      const user = await User.findByIdAndUpdate(
        userId,
        { photoUrl },
        { new: true }
      ).select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.json({ success: true, photoUrl, user });
    } catch (err) {
      console.error("Upload photo error:", err.message);
      res.status(500).json({
        success: false,
        message: "Upload failed",
      });
    }
  }
);

/* ----------------------- Admin Approval ----------------------- */
router.put("/approve/:id", verifyToken, async (req, res) => {
  try {
    const admin = await User.findById(req.user.id);

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin only",
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { approved: true },
      { new: true }
    ).select("-password");

    res.json({ success: true, user });
  } catch (err) {
    console.error("Approval error:", err.message);
    res.status(500).json({
      success: false,
      message: "Approval failed",
    });
  }
});

module.exports = router;
