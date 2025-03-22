const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile, updateUserProfile, firebaseAuth } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Files to upload configuration
const userUpload = upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'panCard', maxCount: 1 },
  { name: 'cancelledCheque', maxCount: 1 },
  { name: 'agricultureCertificate', maxCount: 1 }
]);

// Public routes
router.post('/register', userUpload, registerUser);
router.post('/login', loginUser);
router.post('/firebase-auth', firebaseAuth);

// Protected routes
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, userUpload, updateUserProfile);

module.exports = router; 