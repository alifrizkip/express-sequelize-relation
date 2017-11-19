const express = require('express');

const router = express.Router();

const groupsController = require('../controllers/groupsController');

router.get('/', groupsController.getAllGroup);
router.get('/:id', groupsController.getDetailGroup);
router.post('/', groupsController.createGroup);
router.put('/:id', groupsController.updateGroup);
router.delete('/:id', groupsController.deleteGroup);

router.post('/:id/add-member', groupsController.addMember);
router.delete('/:id/delete-member', groupsController.deleteMember);

module.exports = router;
