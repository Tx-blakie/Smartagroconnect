const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getProductById, 
  createProduct,
  updateProduct,
  deleteProduct,
  getProductsByOwner
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected routes
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);
router.get('/user/myproducts', protect, getProductsByOwner);

module.exports = router; 