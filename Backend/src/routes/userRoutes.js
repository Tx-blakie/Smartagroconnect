const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  firebaseAuth,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { handleMulterError } = require("../middleware/uploadMiddleware");

// Files to upload configuration
const userUpload = upload.fields([
  { name: "profileImage", maxCount: 1 },
  { name: "panCard", maxCount: 1 },
  { name: "cancelledCheque", maxCount: 1 },
  { name: "agricultureCertificate", maxCount: 1 },
]);

// Public routes
router.post("/register", userUpload, handleMulterError, registerUser);
router.post("/login", loginUser);
router.post("/firebase-auth", firebaseAuth);

// Protected routes
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, userUpload, handleMulterError, updateUserProfile);

// Admin routes
router.route("/admin/users").get(protect, admin, getAllUsers);

router
  .route("/admin/users/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

module.exports = router;
