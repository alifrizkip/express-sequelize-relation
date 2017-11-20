const express = require('express');

const router = express.Router();

const addressController = require('../controllers/addressController');

const { checkToken } = require('../middleware/authMiddleware');

router.get(
  '/address',
  checkToken,
  addressController.getAddress,
);

router.put(
  '/address',
  checkToken,
  addressController.updateAddress,
);
// router.get('/:id', postsController.usersDetail);
// router.put('/:id', postsController.usersUpdate);
// router.delete('/:id', postsController.usersDelete);

module.exports = router;
