const express = require('express');

const router = express.Router();

const profileController = require('../controllers/profileController');

const { checkToken } = require('../middleware/authMiddleware');

const { sendData } = require('../handlers/successHandlers');

router.get('/', checkToken, profileController.getProfile, sendData);
router.put('/', checkToken, profileController.updateProfile);
router.get('/address', checkToken, profileController.getAddress);
router.put('/address', checkToken, profileController.updateAddress);

module.exports = router;
