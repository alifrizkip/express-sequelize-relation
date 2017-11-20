const express = require('express');

const router = express.Router();

const groupsController = require('../controllers/groupsController');

const { checkToken } = require('../middleware/authMiddleware');
const { isAdminGroup } = require('../middleware/groupsMiddleware');

router.get('/', groupsController.getAllGroup);
router.get('/:id', groupsController.getDetailGroup);
router.post('/', groupsController.createGroup);
router.put('/:id', isAdminGroup, groupsController.updateGroup);
router.delete('/:id', isAdminGroup, groupsController.deleteGroup);

router.post('/:id/add-member', checkToken, isAdminGroup, groupsController.addMember);
router.delete('/:id/delete-member', checkToken, isAdminGroup, groupsController.deleteMember);

module.exports = router;
