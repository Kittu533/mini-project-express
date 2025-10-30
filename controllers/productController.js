const { Product } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Mendapatkan semua produk
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: { is_active: 1 } // Hanya tampilkan produk yang aktif
    });
    
    res.status(200).json({
      status: 200,
      message: 'Products retrieved successfully',
      data: products
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      status: 500,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};

// Mendapatkan produk berdasarkan ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validasi ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: 400,
        message: 'Valid product ID is required'
      });
    }
    
    const product = await Product.findByPk(id);

    if (!product || product.is_active === 0) {
      return res.status(404).json({
        status: 404,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      status: 200,
      message: 'Product retrieved successfully',
      data: product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      status: 500,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
};

// Menambahkan produk baru
const createProduct = async (req, res) => {
  try {
    const {
      product_code,
      product_name,
      description,
      category,
      price,
      stock_quantity,
      weight,
      release_date,
      is_active = 1
    } = req.body;

    // Validasi input wajib
    if (!product_code || !product_name || price === undefined) {
      return res.status(400).json({
        status: 400,
        message: 'Product code, product name, and price are required'
      });
    }

    // Validasi kategori
    const validCategories = ['Electronics', 'Food', 'Clothing', 'Other'];
    if (category && !validCategories.includes(category)) {
      return res.status(400).json({
        status: 400,
        message: `Category must be one of: ${validCategories.join(', ')}`
      });
    }

    // Validasi harga
    if (isNaN(parseFloat(price)) || parseFloat(price) < 0) {
      return res.status(400).json({
        status: 400,
        message: 'Price must be a valid non-negative number'
      });
    }

    const newProduct = await Product.create({
      product_code,
      product_name,
      description,
      category,
      price: parseFloat(price),
      stock_quantity: stock_quantity !== undefined ? parseInt(stock_quantity) : null,
      weight: weight !== undefined ? parseFloat(weight) : null,
      release_date,
      is_active: is_active ? 1 : 0
    });

    res.status(201).json({
      status: 201,
      message: 'Product created successfully',
      data: {
        product: newProduct
      }
    });
  } catch (error) {
    console.error('Error creating product:', error);
    // Jika error terkait dengan field unik
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        status: 400,
        message: 'Product code already exists'
      });
    }
    res.status(500).json({
      status: 500,
      message: 'Failed to create product',
      error: error.message
    });
  }
};

// Mengupdate produk
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      product_code,
      product_name,
      description,
      category,
      price,
      stock_quantity,
      weight,
      release_date,
      is_active
    } = req.body;

    // Validasi ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: 400,
        message: 'Valid product ID is required'
      });
    }
    
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: 'Product not found'
      });
    }

    // Validasi kategori jika disediakan
    if (category) {
      const validCategories = ['Electronics', 'Food', 'Clothing', 'Other'];
      if (!validCategories.includes(category)) {
        return res.status(400).json({
          status: 400,
          message: `Category must be one of: ${validCategories.join(', ')}`
        });
      }
    }

    // Validasi harga jika disediakan
    if (price !== undefined && (isNaN(parseFloat(price)) || parseFloat(price) < 0)) {
      return res.status(400).json({
        status: 400,
        message: 'Price must be a valid non-negative number'
      });
    }

    await product.update({
      product_code: product_code !== undefined ? product_code : product.product_code,
      product_name: product_name !== undefined ? product_name : product.product_name,
      description: description !== undefined ? description : product.description,
      category: category !== undefined ? category : product.category,
      price: price !== undefined ? parseFloat(price) : product.price,
      stock_quantity: stock_quantity !== undefined ? parseInt(stock_quantity) : product.stock_quantity,
      weight: weight !== undefined ? parseFloat(weight) : product.weight,
      release_date: release_date !== undefined ? release_date : product.release_date,
      is_active: is_active !== undefined ? (is_active ? 1 : 0) : product.is_active
    });

    res.status(200).json({
      status: 200,
      message: 'Product updated successfully',
      data: {
        product
      }
    });
  } catch (error) {
    console.error('Error updating product:', error);
    // Jika error terkait dengan field unik
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({
        status: 400,
        message: 'Product code already exists'
      });
    }
    res.status(500).json({
      status: 500,
      message: 'Failed to update product',
      error: error.message
    });
  }
};

// Menghapus produk (soft delete dengan mengubah is_active menjadi 0)
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Validasi ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        status: 400,
        message: 'Valid product ID is required'
      });
    }

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        status: 404,
        message: 'Product not found'
      });
    }

    await product.update({ is_active: 0 });

    res.status(200).json({
      status: 200,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      status: 500,
      message: 'Failed to delete product',
      error: error.message
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};