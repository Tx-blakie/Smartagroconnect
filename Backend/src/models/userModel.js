const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ['farmer', 'buyer', 'helper', 'admin'],
    required: true
  },
  // Address fields
  state: {
    type: String,
    trim: true
  },
  district: {
    type: String,
    trim: true
  },
  taluka: {
    type: String,
    trim: true
  },
  village: {
    type: String,
    trim: true
  },
  pincode: {
    type: String,
    trim: true
  },
  // Document fields
  panCard: {
    type: String,
    trim: true
  },
  cancelledCheque: {
    type: String,
    trim: true
  },
  // Farmer specific fields
  agricultureCertificate: {
    type: String,
    trim: true
  },
  // Buyer specific fields
  gstNumber: {
    type: String,
    trim: true
  },
  // Helper specific fields
  qualification: {
    type: String,
    trim: true
  },
  expertise: {
    type: String,
    trim: true
  },
  // Common fields
  profileImage: {
    type: String
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  firebaseUid: {
    type: String,
    trim: true
  }
}, { 
  timestamps: true 
});

const User = mongoose.model('User', userSchema);

module.exports = User; 