
// // server.js
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Serve uploaded images
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Multer setup for profile photo uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });
// const upload = multer({ storage });

// // MongoDB connection
// const mongoURI = process.env.MONGO_URI;
// if (!mongoURI) {
//   console.error("❌ MongoDB URI not found in .env");
//   process.exit(1);
// }
// mongoose.connect(mongoURI)
//   .then(() => console.log('✅ MongoDB connected successfully!'))
//   .catch(err => {
//     console.error('❌ MongoDB connection error:', err.message);
//     process.exit(1);
//   });

// // Routes
// const authRouter = require('./routes/auth');
// const userRouter = require('./routes/users'); // Ensure file is named `users.js`

// app.use('/api/auth', authRouter);
// app.use('/api/users', userRouter);

// // Profile photo upload
// app.post('/api/upload', upload.single('photo'), (req, res) => {
//   if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
//   res.json({ imageUrl: `/uploads/${req.file.filename}` });
// });

// // Test root route
// app.get('/', (req, res) => {
//   res.send('🎓 Alumni backend running and connected to MongoDB!');
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));







// ------------------------------------------------------------------------------------------------











// // server.js
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Ensure uploads directory exists
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir, { recursive: true });
// }

// // Serve uploaded images
// app.use('/uploads', express.static(uploadsDir));

// // Multer setup for profile photo uploads (used by our upload route and routes/user.js)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, uploadsDir),
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });
// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
//   fileFilter: (req, file, cb) => {
//     const allowed = /jpeg|jpg|png/;
//     const ext = allowed.test(path.extname(file.originalname).toLowerCase());
//     const mime = allowed.test(file.mimetype);
//     if (ext && mime) cb(null, true);
//     else cb(new Error('Only JPEG, JPG, or PNG images are allowed!'));
//   }
// });

// // MongoDB connection
// const mongoURI = process.env.MONGO_URI;
// if (!mongoURI) {
//   console.error("❌ MongoDB URI not found in .env");
//   process.exit(1);
// }
// mongoose.connect(mongoURI)
//   .then(() => console.log('✅ MongoDB connected successfully!'))
//   .catch(err => {
//     console.error('❌ MongoDB connection error:', err.message);
//     process.exit(1);
//   });

// // Routes
// const authRouter = require('./routes/auth');
// const userRouter = require('./routes/users'); // <-- NOTE: import 'user' (not 'users') to match your file

// app.use('/api/auth', authRouter);
// app.use('/api/users', userRouter);

// // Multer error helper for this route (returns JSON)
// function multerErrorHandler(err, req, res, next) {
//   if (err instanceof multer.MulterError) {
//     return res.status(400).json({ success: false, message: `Multer Error: ${err.message}` });
//   } else if (err) {
//     return res.status(400).json({ success: false, message: err.message || 'File upload failed' });
//   }
//   next();
// }

// // Profile photo upload (standalone)
// app.post('/api/upload', upload.single('photo'), multerErrorHandler, (req, res) => {
//   if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
//   return res.json({ success: true, imageUrl: `/uploads/${req.file.filename}` });
// });

// // Test root route
// app.get('/', (req, res) => {
//   res.json({ message: '🎓 Alumni backend running and connected to MongoDB!' });
// });

// /* ------------------------- Global JSON error handler ------------------------ */
// /* Any unhandled error will be returned as JSON instead of HTML (prevents invalid JSON parsing at frontend) */
// app.use((err, req, res, next) => {
//   console.error('Unhandled error:', err);
//   if (res.headersSent) return next(err);
//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || 'Internal Server Error'
//   });
// });

// /* --------------------------------- Start ---------------------------------- */
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
  









// ---------------- upper one is main ------ changes start from below here --------------------







// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();

/* ----------------------------- Basic Middleware ---------------------------- */
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

/* --------------------------- Uploads Directory ----------------------------- */
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
// app.use("/uploads", express.static(uploadsDir));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/uploads", express.static("uploads"));


/* ----------------------------- Multer Config -------------------------------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(file.mimetype)) {
      cb(new Error("Only JPG, JPEG, PNG images allowed"));
    } else {
      cb(null, true);
    }
  },
});

/* ----------------------------- MongoDB Connect ----------------------------- */
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI missing in .env");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
    process.exit(1);
  });

/* ---------------------------------- Routes --------------------------------- */
app.get("/", (req, res) => {
  res.json({ message: "🎓 Sinhgad Alumni Backend is running" });
});

app.use("/api/auth", require("./routes/auth"));
app.use("/api/users", require("./routes/users"));

/* ----------------------------- Upload Endpoint ----------------------------- */
app.post("/api/upload", upload.single("photo"), (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ success: false, message: "No file uploaded" });

    return res.json({
      success: true,
      imageUrl: `/uploads/${req.file.filename}`,
    });
  } catch (err) {
    return res.status(400).json({ success: false, message: err.message });
  }
});

/* ------------------------------ Error Handler ------------------------------ */
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  if (res.headersSent) return next(err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* --------------------------------- Start ----------------------------------- */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Alumni Backend running on port ${PORT}`)
);


