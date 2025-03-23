const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    console.log('Register user request received:', {
      body: req.body,
      files: req.files ? Object.keys(req.files) : 'No files',
      contentType: req.headers['content-type']
    });

    const {
      name,
      email,
      password,
      role,
      phone,
      state,
      district,
      taluka,
      village,
      pincode,
      gstNumber,
      qualification,
      expertise,
      firebaseUid,
    } = req.body;

    // Validation - make sure required fields are present
    if (!name || !email || !password || !role || !phone) {
      console.log('Missing required fields:', { 
        name: !!name, 
        email: !!email, 
        password: !!password, 
        role: !!role, 
        phone: !!phone 
      });
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if user already exists with this email
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Check if user already exists with this phone
    const phoneExists = await User.findOne({ phone });
    if (phoneExists) {
      return res
        .status(400)
        .json({ message: "Phone number already registered" });
    }

    // Hash password if provided (for email/password auth)
    let hashedPassword = null;
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        hashedPassword = await bcrypt.hash(password, salt);
        console.log('Password hashed successfully');
      } else {
        return res.status(400).json({ message: "Password is required" });
      }
    } catch (hashError) {
      console.error('Error hashing password:', hashError);
      return res.status(500).json({ message: "Error processing password", error: hashError.message });
    }

    // Handle file uploads - store file paths
    let panCardPath = "";
    let cancelledChequePath = "";
    let agricultureCertificatePath = "";
    let profileImagePath = "";

    if (req.files) {
      console.log('Processing files:', Object.keys(req.files));
      
      try {
        if (req.files.panCard) {
          panCardPath = req.files.panCard[0].path.replace(/\\/g, "/");
          console.log('PAN card path:', panCardPath);
        }
        if (req.files.cancelledCheque) {
          cancelledChequePath = req.files.cancelledCheque[0].path.replace(
            /\\/g,
            "/"
          );
          console.log('Cancelled cheque path:', cancelledChequePath);
        }
        if (req.files.agricultureCertificate && role === "farmer") {
          agricultureCertificatePath =
            req.files.agricultureCertificate[0].path.replace(/\\/g, "/");
          console.log('Agriculture certificate path:', agricultureCertificatePath);
        }
        if (req.files.profileImage) {
          profileImagePath = req.files.profileImage[0].path.replace(/\\/g, "/");
          console.log('Profile image path:', profileImagePath);
        }
      } catch (fileError) {
        console.error('Error processing uploaded files:', fileError);
        return res.status(400).json({ message: "Error processing uploaded files", error: fileError.message });
      }
    } else {
      console.log('No files were uploaded in the request');
    }

    // Create user with all provided fields
    const userData = {
      name,
      email,
      password: hashedPassword,
      role,
      phone,
      state,
      district,
      taluka,
      village,
      pincode,
      panCard: panCardPath,
      cancelledCheque: cancelledChequePath,
      profileImage: profileImagePath,
      firebaseUid,
    };

    // Add role-specific fields
    if (role === "farmer") {
      userData.agricultureCertificate = agricultureCertificatePath;
    }
    if (role === "buyer") {
      userData.gstNumber = gstNumber;
    }
    if (role === "helper") {
      userData.qualification = qualification;
      userData.expertise = expertise;
    }

    console.log('Creating user with data:', {
      name: userData.name,
      email: userData.email,
      role: userData.role,
      phone: userData.phone,
      hasFiles: !!req.files
    });

    try {
      const user = await User.create(userData);

      if (user) {
        console.log('User created successfully:', user._id);
        
        // Generate token
        const token = generateToken(user._id);
        if (!token) {
          console.error('Failed to generate token');
          return res.status(500).json({ message: "Failed to generate authentication token" });
        }
        
        return res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          token: token,
        });
      } else {
        console.error('User.create did not return a user object');
        return res.status(400).json({ message: "Invalid user data" });
      }
    } catch (dbError) {
      console.error('Database error creating user:', dbError);
      return res.status(500).json({ 
        message: "Database error creating user", 
        error: dbError.message,
        code: dbError.code
      });
    }
  } catch (error) {
    console.error('Uncaught error in registerUser:', error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login user with email/password
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login or register with Firebase auth (phone or other methods)
exports.firebaseAuth = async (req, res) => {
  try {
    const { firebaseUid, email, phone, name } = req.body;

    // First check if user exists with this Firebase UID
    let user = await User.findOne({ firebaseUid });

    // If not found by Firebase UID, try to find by email or phone
    if (!user && email) {
      user = await User.findOne({ email });
    }

    if (!user && phone) {
      user = await User.findOne({ phone });
    }

    // If user exists, update the Firebase UID if needed
    if (user) {
      if (!user.firebaseUid) {
        user.firebaseUid = firebaseUid;
        await user.save();
      }

      // Return user data with token
      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        token: generateToken(user._id),
      });
    } else {
      // If this is just authentication, not registration, return error
      if (!name) {
        return res
          .status(404)
          .json({ message: "User not found. Please register first." });
      }

      // Create a new user with basic info from Firebase
      // For registration via phone, require additional registration steps
      const newUser = await User.create({
        name,
        email: email || "",
        phone: phone || "",
        firebaseUid,
        role: "buyer", // Default role, should be updated during complete registration
        password: "", // No password for Firebase auth users
      });

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        phone: newUser.phone,
        token: generateToken(newUser._id),
        requiresProfileCompletion: true,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      // Update basic fields if provided
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.state = req.body.state || user.state;
      user.district = req.body.district || user.district;
      user.taluka = req.body.taluka || user.taluka;
      user.village = req.body.village || user.village;
      user.pincode = req.body.pincode || user.pincode;

      // Update role-specific fields
      if (user.role === "buyer" && req.body.gstNumber) {
        user.gstNumber = req.body.gstNumber;
      }

      if (user.role === "helper") {
        user.qualification = req.body.qualification || user.qualification;
        user.expertise = req.body.expertise || user.expertise;
      }

      // Update password if provided
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      // Handle file uploads if any
      if (req.files) {
        if (req.files.panCard) {
          // Delete old file if exists
          if (user.panCard) {
            try {
              fs.unlinkSync(path.join(__dirname, "../..", user.panCard));
            } catch (err) {
              console.error("Error deleting old PAN card:", err);
            }
          }
          user.panCard = req.files.panCard[0].path.replace(/\\/g, "/");
        }

        if (req.files.cancelledCheque) {
          // Delete old file if exists
          if (user.cancelledCheque) {
            try {
              fs.unlinkSync(
                path.join(__dirname, "../..", user.cancelledCheque)
              );
            } catch (err) {
              console.error("Error deleting old cheque:", err);
            }
          }
          user.cancelledCheque = req.files.cancelledCheque[0].path.replace(
            /\\/g,
            "/"
          );
        }

        if (req.files.agricultureCertificate && user.role === "farmer") {
          // Delete old file if exists
          if (user.agricultureCertificate) {
            try {
              fs.unlinkSync(
                path.join(__dirname, "../..", user.agricultureCertificate)
              );
            } catch (err) {
              console.error("Error deleting old certificate:", err);
            }
          }
          user.agricultureCertificate =
            req.files.agricultureCertificate[0].path.replace(/\\/g, "/");
        }

        if (req.files.profileImage) {
          // Delete old file if exists
          if (user.profileImage) {
            try {
              fs.unlinkSync(path.join(__dirname, "../..", user.profileImage));
            } catch (err) {
              console.error("Error deleting old profile image:", err);
            }
          }
          user.profileImage = req.files.profileImage[0].path.replace(
            /\\/g,
            "/"
          );
        }
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Admin: Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Admin: Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Admin: Update user
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      // Update basic fields if provided
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.role = req.body.role || user.role;
      user.state = req.body.state || user.state;
      user.district = req.body.district || user.district;
      user.taluka = req.body.taluka || user.taluka;
      user.village = req.body.village || user.village;
      user.pincode = req.body.pincode || user.pincode;
      user.isVerified =
        req.body.isVerified !== undefined
          ? req.body.isVerified
          : user.isVerified;

      // Update role-specific fields
      if (user.role === "buyer" && req.body.gstNumber) {
        user.gstNumber = req.body.gstNumber;
      }

      if (user.role === "helper") {
        user.qualification = req.body.qualification || user.qualification;
        user.expertise = req.body.expertise || user.expertise;
      }

      // Update password if provided
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        isVerified: updatedUser.isVerified,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Admin: Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      // Delete user's files if they exist
      const filesToDelete = [
        user.profileImage,
        user.panCard,
        user.cancelledCheque,
        user.agricultureCertificate,
      ].filter(Boolean);

      for (const filePath of filesToDelete) {
        const absolutePath = path.resolve(filePath);
        if (fs.existsSync(absolutePath)) {
          fs.unlinkSync(absolutePath);
        }
      }

      await User.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Generate JWT token
const generateToken = (id) => {
  const secret = process.env.JWT_SECRET || 'fallback_secret_key_for_development';
  if (!process.env.JWT_SECRET) {
    console.warn('WARNING: Using fallback JWT secret key. Set JWT_SECRET in .env file for production.');
  }
  return jwt.sign({ id }, secret, {
    expiresIn: "30d",
  });
};
