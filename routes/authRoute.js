const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

// const authMiddleware = require('../middleware/authMiddleware');

router.post('/login', authController.loginProcess);
router.post('/register', authController.registerProcess);

module.exports = router;
