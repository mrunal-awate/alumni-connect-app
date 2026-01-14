// const mongoose = require('mongoose');
// const UserSchema = new mongoose.Schema({
//   name: String,
//   email: { type: String, unique: true, required: true },
//   password: { type: String, required: true },
//   branch: String,
//   year: String,
//   company: String,
//   photoUrl: String,
//   role: { type: String, default: 'user' },
//   approved: { type: Boolean, default: false }
// }, { timestamps: true });

// module.exports = mongoose.model('User', UserSchema);





// -----------------------------------------------------------------------








// // models/User.js
// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   name: { type: String, trim: true },
//   email: { type: String, unique: true, required: true, trim: true, lowercase: true },
//   password: { type: String, required: true, select: false }, // exclude by default when querying if select:false is supported
//   branch: { type: String, trim: true },
//   // Keep legacy 'year' for backward compatibility, but prefer graduationYear
//   year: { type: String, trim: true }, 
//   graduationYear: { type: String, trim: true },
//   company: { type: String, trim: true },
//   photoUrl: { type: String, trim: true },
//   role: { type: String, default: 'user', enum: ['user', 'admin'] },
//   approved: { type: Boolean, default: false }
// }, { timestamps: true });

// // Ensure either graduationYear or year is present (optional - remove if not desired)
// // UserSchema.path('graduationYear').validate(function(v) {
// //   return !!(v || this.year);
// // }, 'Either graduationYear or year must be provided.');

// // Remove sensitive fields when converting to JSON
// UserSchema.methods.toJSON = function () {
//   const obj = this.toObject();
//   delete obj.password;
//   return obj;
// };

// // Optional: virtual getter for a unified graduationYear value
// UserSchema.virtual('gradYear').get(function () {
//   return this.graduationYear || this.year || '';
// });

// module.exports = mongoose.model('User', UserSchema);










// ----------------------------upper one is main ------ changes start from below here --------------------







const mongoose = require("mongoose");

const EducationSchema = new mongoose.Schema(
  {
    college: String,
    branch: String,
    batch: String,
    degree: String,
  },
  { _id: false }
);

const ExperienceSchema = new mongoose.Schema(
  {
    company: String,
    role: String,
    location: String,
    from: String,
    to: String,
    isCurrent: Boolean,
  },
  { _id: false }
);

const UserSchema = new mongoose.Schema(
  {
    // Basic
    name: { type: String, required: true, trim: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true, select: false },

    // Role system
    role: {
      type: String,
      enum: ["student", "alumni", "admin"],
      default: "student",
    },

    // College identity
    college: {
      type: String,
      enum: ["SITS", "NBN", "SCOE", "SKNCOE", "RMD", "SIT"],
      required: true,
    },
    branch: {
      type: String,
      enum: ["Computer", "IT", "ENTC", "Civil", "Mechanical"],
      required: true,
    },
    batch: {
      type: String, // 2021, 2022 etc
      required: true,
    },

    // Professional
    company: String,
    jobTitle: String,
    city: String,

    // Profile
    photoUrl: String,
    bio: String,

    // LinkedIn style sections
    education: [EducationSchema],
    experience: [ExperienceSchema],

    // Admin approval
    approved: {
      type: Boolean,
      default: false,
    },

    // Account status
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Hide password in API responses
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", UserSchema);
