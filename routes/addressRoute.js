const express = require('express');

const router = express.Router();

const addressController = require('../controllers/addressController');

router.get('/:userId/address', addressController.getAddress);
router.put('/:userId/address', addressController.updateAddress);
// router.get('/:id', postsController.usersDetail);
// router.put('/:id', postsController.usersUpdate);
// router.delete('/:id', postsController.usersDelete);

module.exports = router;
