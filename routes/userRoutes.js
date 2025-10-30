const express = require('express');
const { register, login } = require('../controllers/userController');
const router = express.Router();

// Route untuk register
router.post('/register', register);

// Route untuk login
router.post('/login', login);

module.exports = router;