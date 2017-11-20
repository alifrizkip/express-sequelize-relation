const express = require('express');

const router = express.Router();

const postsController = require('../controllers/postsController');

const { checkToken } = require('../middleware/authMiddleware');

router.get('/posts', checkToken, postsController.getAllPost);
router.get('/posts/:id', checkToken, postsController.getPost);
router.post('/posts', checkToken, postsController.createPost);
router.put('/posts/:id', checkToken, postsController.updatePost);
router.delete('/posts/:id', checkToken, postsController.deletePost);

module.exports = router;
