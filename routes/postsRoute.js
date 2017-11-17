const express = require('express');

const router = express.Router();

const postsController = require('../controllers/postsController');

router.get('/:userId/posts', postsController.getAllPost);
router.get('/:userId/posts/:id', postsController.getPost);
router.post('/:userId/posts', postsController.createPost);
router.put('/:userId/posts/:id', postsController.updatePost);
router.delete('/:userId/posts/:id', postsController.deletePost);

module.exports = router;
