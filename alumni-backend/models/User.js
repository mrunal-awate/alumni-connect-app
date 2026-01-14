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








// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, unique: true, required: true, trim: true, lowercase: true },
  password: { type: String, required: true, select: false }, // exclude by default when querying if select:false is supported
  branch: { type: String, trim: true },
  // Keep legacy 'year' for backward compatibility, but prefer graduationYear
  year: { type: String, trim: true }, 
  graduationYear: { type: String, trim: true },
  company: { type: String, trim: true },
  photoUrl: { type: String, trim: true },
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
  approved: { type: Boolean, default: false }
}, { timestamps: true });

// Ensure either graduationYear or year is present (optional - remove if not desired)
// UserSchema.path('graduationYear').validate(function(v) {
//   return !!(v || this.year);
// }, 'Either graduationYear or year must be provided.');

// Remove sensitive fields when converting to JSON
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// Optional: virtual getter for a unified graduationYear value
UserSchema.virtual('gradYear').get(function () {
  return this.graduationYear || this.year || '';
});

module.exports = mongoose.model('User', UserSchema);










// ----------------------------upper one is main ------ changes start from below here --------------------







