const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const createDirIfNotExists = (dirPath) => {
  const fullPath = path.join(__dirname, '../../uploads', dirPath);
  console.log(`Ensuring directory exists: ${fullPath}`);
  if (!fs.existsSync(fullPath)) {
    console.log(`Creating directory: ${fullPath}`);
    try {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`Directory created successfully: ${fullPath}`);
    } catch (error) {
      console.error(`Error creating directory ${fullPath}:`, error);
      throw error;
    }
  } else {
    console.log(`Directory already exists: ${fullPath}`);
  }
  return fullPath;
};

// Create upload directories
try {
  createDirIfNotExists('profiles');
  createDirIfNotExists('documents');
  console.log('Upload directories created successfully');
} catch (error) {
  console.error('Failed to create upload directories:', error);
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath;
    // Determine destination based on file type
    if (file.fieldname === 'profileImage') {
      uploadPath = path.join(__dirname, '../../uploads/profiles');
    } else {
      uploadPath = path.join(__dirname, '../../uploads/documents');
    }
    console.log(`File destination for ${file.fieldname}: ${uploadPath}`);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Create unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    const filename = file.fieldname + '-' + uniqueSuffix + extension;
    console.log(`Generated filename: ${filename} for original: ${file.originalname}`);
    cb(null, filename);
  }
});

// File filter function
const fileFilter = (req, file, cb) => {
  console.log(`Filtering file: ${file.fieldname}, mimetype: ${file.mimetype}`);
  // Accept images and documents
  if (file.fieldname === 'profileImage') {
    if (file.mimetype.startsWith('image/')) {
      console.log(`Accepting ${file.fieldname} as image`);
      cb(null, true);
    } else {
      console.log(`Rejecting ${file.fieldname}: not an image file`);
      cb(new Error('Profile image must be an image file'), false);
    }
  } else {
    // For documents, accept images and PDFs
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      console.log(`Accepting ${file.fieldname} as image/PDF`);
      cb(null, true);
    } else {
      console.log(`Rejecting ${file.fieldname}: not an image or PDF file`);
      cb(new Error('Documents must be image or PDF files'), false);
    }
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: fileFilter
});

// Add error handling middleware
const handleMulterError = (err, req, res, next) => {
  console.error('Multer error:', err);
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ message: 'File too large. Max size is 5MB.' });
    }
    return res.status(400).json({ message: `Upload error: ${err.message}` });
  }
  next(err);
};

// Export both the upload middleware and error handler
module.exports = upload;
// Export the error handler separately
module.exports.handleMulterError = handleMulterError; 