const express = require('express');
const { 
  getAllProducts, 
  getProductById, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const router = express.Router();

// Semua route produk memerlukan token autentikasi
// GET /products - Mendapatkan semua produk
router.get('/', authenticateToken, getAllProducts);

// GET /products/:id - Mendapatkan produk berdasarkan ID
router.get('/:id', authenticateToken, getProductById);

// POST /products - Menambahkan produk baru
router.post('/', authenticateToken, createProduct);

// PUT /products/:id - Mengupdate produk
router.put('/:id', authenticateToken, updateProduct);

// DELETE /products/:id - Menghapus produk
router.delete('/:id', authenticateToken, deleteProduct);

module.exports = router;