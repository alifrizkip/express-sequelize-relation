const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');
const { allowFor } = require('../middleware/authMiddleware');

router.get('/', allowFor('admin'), usersController.usersAll);
router.get('/:id', allowFor('admin'), usersController.usersDetail);
router.post('/', allowFor('admin'), usersController.usersCreate);
router.put('/:id', allowFor('admin'), usersController.usersUpdate);
router.delete('/:id', allowFor('admin'), usersController.usersDelete);

module.exports = router;
