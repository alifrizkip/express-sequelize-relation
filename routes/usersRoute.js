const express = require('express');

const router = express.Router();

const usersController = require('../controllers/usersController');

router.get('/', usersController.usersAll);
router.get('/:id', usersController.usersDetail);
router.post('/', usersController.usersCreate);
router.put('/:id', usersController.usersUpdate);
router.delete('/:id', usersController.usersDelete);

module.exports = router;
